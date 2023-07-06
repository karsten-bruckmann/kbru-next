import { FormControl, FormGroup } from '@angular/forms';
import { allValuesSet } from '@kbru/shared/utils/angular-utils';
import {
  createEffectAwareForm,
  FormEffect,
} from '@kbru/shared/utils/effect-aware-forms';
import {
  Roster,
  SelectionReference,
} from '@kbru/war-game-companion/data-access/rosters';
import { Store } from '@ngrx/store';
import { map, Observable, of, ReplaySubject, startWith, switchMap } from 'rxjs';

import { addSelectionEntryFormSubmitted } from '../actions/add-selection-entry-form-submitted.action';
import { availableCategoriesSelector } from '../selectors/available-categories.selector';
import { availableCategorySelectionsSelector } from '../selectors/available-category-selections.selector';

export class AddSelectionEntryForm extends FormGroup<{
  categoryId: CategoryIdControl;
  selectionReference: SelectionReferenceControl;
}> {
  public static effectAware(
    store$: Store,
    roster: Roster,
    forceIndex: number
  ): Observable<AddSelectionEntryForm> {
    const form = new AddSelectionEntryForm(store$, roster, forceIndex);
    return createEffectAwareForm(form, [
      ...form.controls.selectionReference.effects,
    ]);
  }

  constructor(
    private readonly store$: Store,
    public readonly roster: Roster,
    public readonly forceIndex: number
  ) {
    super(
      {
        categoryId: new CategoryIdControl(store$, roster, forceIndex),
        selectionReference: new SelectionReferenceControl(
          store$,
          roster,
          forceIndex
        ),
      },
      {
        asyncValidators: [
          async (form) => {
            if (
              !allValuesSet((form as AddSelectionEntryForm).value, {
                categoryId: true,
                selectionReference: true,
              })
            ) {
              return { invalid: true };
            }

            return null;
          },
        ],
      }
    );
  }

  public submit(): void {
    const value = this.value;
    if (!allValuesSet(value, { categoryId: true, selectionReference: true })) {
      return;
    }

    this.store$.dispatch(
      addSelectionEntryFormSubmitted({
        forceIndex: this.forceIndex,
        roster: this.roster,
        value: value,
      })
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

export class SelectionReferenceControl extends FormControl<SelectionReference | null> {
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
        ? this.store$.select(availableCategorySelectionsSelector(categoryId))
        : of([])
    )
  );

  public readonly effects: FormEffect<AddSelectionEntryForm>[] = [
    (form) =>
      form.controls.categoryId.valueChanges.pipe(
        map((id) => this.categoryId$.next(id))
      ),
    () =>
      this.categoryId$.pipe(
        map(() => {
          this.setValue(null);
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
