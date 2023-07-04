import { FormControl, FormGroup } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { catalogueSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { Store } from '@ngrx/store';
import { firstValueFrom, map } from 'rxjs';

import { addForceFormSubmitted } from '../actions/add-force-form-submitted.action';
import { availableForcesSelector } from '../selectors/available-forces.selector';

export class AddForceForm extends FormGroup<{
  forceId: ForceIdControl;
}> {
  constructor(
    private readonly store$: Store,
    public readonly catalogueId: string,
    public readonly rosterId: string
  ) {
    super(
      {
        forceId: new ForceIdControl(store$),
      },
      {
        asyncValidators: [
          async (form) => {
            if (!form.value.forceId) {
              return { invalid: true };
            }

            const catalogue = await firstValueFrom(
              store$.select(catalogueSelector)
            );
            if (!catalogue || catalogue['@_id'] !== this.catalogueId) {
              return { invalid: true };
            }

            return null;
          },
        ],
      }
    );
  }

  public async submit() {
    const { forceId } = this.value;
    if (!forceId) {
      return;
    }

    this.store$.dispatch(
      addForceFormSubmitted({
        value: {
          catalogueId: this.catalogueId,
          forceId,
          rosterId: this.rosterId,
        },
      })
    );
  }
}

export class ForceIdControl extends FormControl<string | null> {
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
