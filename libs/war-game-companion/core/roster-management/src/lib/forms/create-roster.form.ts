import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { availableGameSystemsSelector } from '../selectors/available-game-systems.selector';

export class CreateRosterForm extends FormGroup<{
  name: FormControl<string | null>;
  gameSystemId: GameSystemIdControl;
}> {
  constructor(private store$: Store) {
    super(
      {
        name: new FormControl(''),
        gameSystemId: new GameSystemIdControl(store$),
      },
      {
        asyncValidators: [
          async (form) => {
            if (!form.value.name || !form.value.gameSystemId) {
              return { invalid: true };
            }

            return null;
          },
        ],
      }
    );
  }
}

export class GameSystemIdControl extends FormControl<string | null> {
  constructor(private store$: Store) {
    super('');
  }

  public readonly options$ = this.store$.select(availableGameSystemsSelector);
}
