import { FormControl, FormGroup } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { repositoryOpenedAction } from '@kbru/war-game-companion/data-access/game-definition-data';
import { Store } from '@ngrx/store';
import { combineLatest, map, ReplaySubject, startWith, switchMap } from 'rxjs';

import { availableCategoriesSelector } from '../selectors/available-categories.selector';
import { availableSelectionEntriesSelector } from '../selectors/available-selection-entries.selector';
import { rosterSelector } from '../selectors/roster.selector';

export class AddSelectionEntryForm extends FormGroup<{
  categoryId: CategoryIdControl;
  entryLinkId: EntryLinkIdControl;
}> {
  constructor(
    store$: Store,
    public readonly repositoryName: string,
    public readonly rosterId: string,
    public readonly forceIndex: number
  ) {
    store$.dispatch(repositoryOpenedAction({ repositoryName }));
    super(
      {
        categoryId: new CategoryIdControl(
          store$,
          repositoryName,
          rosterId,
          forceIndex
        ),
        entryLinkId: new EntryLinkIdControl(
          store$,
          repositoryName,
          rosterId,
          forceIndex
        ),
      },
      {
        asyncValidators: [
          async (form) => {
            if (!form.value.forceId) {
              return { invalid: true };
            }

            return null;
          },
        ],
      }
    );
  }
}

export class CategoryIdControl extends FormControl<string | null> {
  constructor(
    private store$: Store,
    public readonly repositoryName: string,
    public readonly rosterId: string,
    public readonly forceIndex: number
  ) {
    super(null);
  }

  public readonly options$ = this.store$.select(
    availableCategoriesSelector(
      this.repositoryName,
      this.rosterId,
      this.forceIndex
    )
  );
}

export class EntryLinkIdControl extends FormControl<string | null> {
  constructor(
    private store$: Store,
    public readonly repositoryName: string,
    public readonly rosterId: string,
    public readonly forceIndex: number
  ) {
    super(null);
  }

  private readonly categoryId$ = new ReplaySubject<string | null>(0);

  public readonly options$ = combineLatest([
    this.store$
      .select(rosterSelector(this.repositoryName, this.rosterId))
      .pipe(filterNullish()),
    this.categoryId$.pipe(filterNullish()),
  ]).pipe(
    switchMap(([roster, categoryId]) =>
      this.store$.select(
        availableSelectionEntriesSelector(
          roster?.forces[this.forceIndex].catalogueId,
          categoryId
        )
      )
    )
  );

  public readonly effects: FormEffect<AddSelectionEntryForm>[] = [
    (form) =>
      form.controls.categoryId.valueChanges.pipe(
        startWith(form.controls.categoryId.value),
        map((categoryId) => {
          this.categoryId$.next(categoryId);
        })
      ),
    () =>
      this.options$.pipe(
        startWith([]),
        map((options) => {
          if (options.length === 0) {
            this.setValue(null);
            this.disable();
          } else {
            this.enable();
          }
        })
      ),
  ];
}
