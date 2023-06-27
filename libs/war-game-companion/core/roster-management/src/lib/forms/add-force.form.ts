import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { availableForcesSelector } from '../selectors/available-forces.selector';

export class AddForceForm extends FormGroup<{
  forceId: ForceIdControl;
}> {
  constructor(store$: Store, public readonly rosterId: string) {
    super(
      {
        forceId: new ForceIdControl(store$, rosterId),
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

export class ForceIdControl extends FormControl<string | null> {
  constructor(private store$: Store, public readonly rosterId: string) {
    super(null);
  }

  public readonly options$ = this.store$.select(
    availableForcesSelector(this.rosterId)
  );
}
