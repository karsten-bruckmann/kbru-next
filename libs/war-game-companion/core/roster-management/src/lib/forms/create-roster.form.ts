import { FormControl, FormGroup } from '@angular/forms';
import { allValuesSet } from '@kbru/shared/utils/angular-utils';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { catalogueSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { Force } from '@kbru/war-game-companion/data-access/rosters';
import { Store } from '@ngrx/store';
import { firstValueFrom, map } from 'rxjs';

import { createRosterFormSubmittedAction } from '../actions/create-roster-form-submitted.action';
import { availableForcesSelector } from '../selectors/available-forces.selector';
import { AddForceForm } from './add-force.form';

export class CreateRosterForm extends FormGroup<{
  name: FormControl<string | null>;
  force: ForceControl;
}> {
  constructor(
    private readonly store$: Store,
    public readonly catalogueId: string
  ) {
    super(
      {
        name: new FormControl(''),
        force: new ForceControl(store$),
      },
      {
        asyncValidators: [
          async (form) => {
            if (
              !allValuesSet((form as CreateRosterForm).value, {
                force: true,
                name: true,
              })
            ) {
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
    if (!this.valid) {
      return;
    }

    const value = this.value;
    if (!allValuesSet(value, { force: true, name: true })) {
      return;
    }

    this.store$.dispatch(
      createRosterFormSubmittedAction({
        catalogueId: this.catalogueId,
        value: value,
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
