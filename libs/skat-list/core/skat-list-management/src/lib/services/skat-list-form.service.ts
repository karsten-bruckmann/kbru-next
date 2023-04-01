import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { calculationTypesFormEffect } from '../form-effects/calculation-types.form-effect';
import { maxSetsFormEffect } from '../form-effects/max-sets.form-effect';
import { spitzenFormEffect } from '../form-effects/spitzen.form-effect';
import { updateAvailablePlayersFormEffect } from '../form-effects/update-available-players.form-effect';
import { CalculationTypeFormControl } from '../models/form-controls/calculation-type.form-control';
import { MaxSetsFormControl } from '../models/form-controls/max-sets.form-control';
import { PlayerIdsFormControl } from '../models/form-controls/player-ids.form-control';
import { SpitzenFormControl } from '../models/form-controls/spitzen.form-control';
import { SkatListForm } from '../models/skat-list-form.model';
import { calculationTypeValidatorFunction } from '../validator-functions/calculation-type.validator-function';
import { maxSetsValidatorFunction } from '../validator-functions/max-sets.validator-function';
import { spitzenValidatorFunction } from '../validator-functions/spitzen.validator-function';

@Injectable({ providedIn: 'root' })
export class SkatListFormService {
  constructor(private store$: Store) {}

  public getForm$(groupId: string): Observable<SkatListForm> {
    return createEffectAwareForm(
      new SkatListForm({
        groupId: new FormControl<string>(groupId, Validators.required),
        playerIds: new PlayerIdsFormControl(null),
        calculationType: new CalculationTypeFormControl(
          null,
          calculationTypeValidatorFunction
        ),
        spitzen: new SpitzenFormControl(null, spitzenValidatorFunction),
        maxSets: new MaxSetsFormControl(null, maxSetsValidatorFunction),
      }),
      [
        updateAvailablePlayersFormEffect(this.store$),
        calculationTypesFormEffect(),
        spitzenFormEffect(),
        maxSetsFormEffect(),
      ]
    );
  }
}
