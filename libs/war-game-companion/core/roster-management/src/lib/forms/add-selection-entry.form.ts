import { FormControl, FormGroup } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { map, of, ReplaySubject, startWith, switchMap } from 'rxjs';

import { Roster } from '../models/roster.model';
import { availableCategoriesSelector } from '../selectors/available-categories.selector';
import { availableSelectionEntriesSelector } from '../selectors/available-selection-entries.selector';

export class AddSelectionEntryForm extends FormGroup<{
  categoryId: CategoryIdControl;
  entryLinkId: EntryLinkIdControl;
}> {
  constructor(
    store$: Store,
    public readonly roster: Roster,
    public readonly forceIndex: number
  ) {
    super(
      {
        categoryId: new CategoryIdControl(store$, roster, forceIndex),
        entryLinkId: new EntryLinkIdControl(store$, roster, forceIndex),
      },
      {
        asyncValidators: [
          async (form) => {
            if (!form.value.categoryId || !form.value.entryLinkId) {
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
    public readonly roster: Roster,
    public readonly forceIndex: number
  ) {
    super(null);
  }

  public readonly options$ = this.store$.select(
    availableCategoriesSelector(this.roster.forces[this.forceIndex])
  );
}

export class EntryLinkIdControl extends FormControl<string | null> {
  constructor(
    private store$: Store,
    public readonly roster: Roster,
    public readonly forceIndex: number
  ) {
    super(null);
  }

  public categoryId$ = new ReplaySubject<string | null>(1);

  public readonly options$ = this.categoryId$.pipe(
    switchMap((categoryId) =>
      categoryId
        ? this.store$.select(availableSelectionEntriesSelector(categoryId))
        : of([])
    )
  );

  public readonly effects: FormEffect<AddSelectionEntryForm>[] = [
    (form) =>
      form.controls.categoryId.valueChanges.pipe(
        map((id) => this.categoryId$.next(id))
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
