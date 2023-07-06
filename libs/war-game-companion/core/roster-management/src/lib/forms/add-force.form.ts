import { FormControl, FormGroup } from '@angular/forms';
import { allValuesSet } from '@kbru/shared/utils/angular-utils';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { catalogueSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { Force } from '@kbru/war-game-companion/data-access/rosters';
import { Store } from '@ngrx/store';
import { firstValueFrom, map } from 'rxjs';

import { addForceFormSubmittedAction } from '../actions/add-force-form-submitted.action';
import { availableForcesSelector } from '../selectors/available-forces.selector';

export class AddForceForm extends FormGroup<{
  force: ForceControl;
}> {
  constructor(
    private readonly store$: Store,
    public readonly catalogueId: string,
    public readonly rosterId: string
  ) {
    super(
      {
        force: new ForceControl(store$),
      },
      {
        asyncValidators: [
          async (form) => {
            if (!allValuesSet((form as AddForceForm).value, { force: true })) {
              return { invalid: true };
            }

            const catalogue = await firstValueFrom(
              store$.select(catalogueSelector)
            );
            if (!catalogue || catalogue.id !== this.catalogueId) {
              return { invalid: true };
            }

            return null;
          },
        ],
      }
    );
  }

  public async submit() {
    const value = this.value;
    if (!allValuesSet(value, { force: true })) {
      return;
    }

    this.store$.dispatch(
      addForceFormSubmittedAction({
        catalogueId: this.catalogueId,
        rosterId: this.rosterId,
        value,
      })
    );
  }
}

export class ForceControl extends FormControl<Force | null> {
  constructor(private store$: Store) {
    super(null);
  }

  public readonly options$ = this.store$.select(availableForcesSelector);

  public readonly effects: FormEffect<AddForceForm>[] = [
    () =>
      this.options$.pipe(
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
