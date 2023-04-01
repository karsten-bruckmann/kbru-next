import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { calculationTypesFormEffect } from '../form-effects/calculation-types.form-effect';
import { centPerPointFormEffect } from '../form-effects/cent-per-point.form-effect';
import { hirschFormEffect } from '../form-effects/hirsch.form-effect';
import { kontraReFormEffect } from '../form-effects/kontra-re.form-effect';
import { maxSetsFormEffect } from '../form-effects/max-sets.form-effect';
import { spitzenFormEffect } from '../form-effects/spitzen.form-effect';
import { thresholdAnnouncementWithoutHandFormEffect } from '../form-effects/threshold-announcement-without-hand.form-effect';
import { updateAvailablePlayersFormEffect } from '../form-effects/update-available-players.form-effect';
import { CalculationTypeFormControl } from '../models/form-controls/calculation-type.form-control';
import { CentPerPointFormControl } from '../models/form-controls/cent-per-point.form-control';
import { HirschFormControl } from '../models/form-controls/hirsch.form-control';
import { KontraReFormControl } from '../models/form-controls/kontra-re.form-control';
import { MaxSetsFormControl } from '../models/form-controls/max-sets.form-control';
import { PlayerIdsFormControl } from '../models/form-controls/player-ids.form-control';
import { SpitzenFormControl } from '../models/form-controls/spitzen.form-control';
import { ThresholdAnnouncementWithoutHandControl } from '../models/form-controls/threshold-announcement-without-hand.form-control';
import { SkatListForm } from '../models/skat-list-form.model';
import { calculationTypeValidatorFunction } from '../validator-functions/calculation-type.validator-function';
import { centPerPointValidatorFunction } from '../validator-functions/cent-per-point.validator-function';
import { hirschdValidatorFunction } from '../validator-functions/hirsch.validator-function';
import { kontraReValidatorFunction } from '../validator-functions/kontra-re.validator-function';
import { maxSetsValidatorFunction } from '../validator-functions/max-sets.validator-function';
import { spitzenValidatorFunction } from '../validator-functions/spitzen.validator-function';
import { thresholdAnnouncementWithoutHandValidatorFunction } from '../validator-functions/threshold-announcement-without-hand.validator-function';

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
        centPerPoint: new CentPerPointFormControl(
          null,
          centPerPointValidatorFunction
        ),
        kontraRe: new KontraReFormControl(null, kontraReValidatorFunction),
        hirsch: new HirschFormControl(null, hirschdValidatorFunction),
        thresholdAnnouncementWithoutHand:
          new ThresholdAnnouncementWithoutHandControl(
            null,
            thresholdAnnouncementWithoutHandValidatorFunction
          ),
      }),
      [
        updateAvailablePlayersFormEffect(this.store$),
        calculationTypesFormEffect(),
        spitzenFormEffect(),
        maxSetsFormEffect(),
        centPerPointFormEffect(),
        kontraReFormEffect(),
        hirschFormEffect(),
        thresholdAnnouncementWithoutHandFormEffect(),
      ]
    );
  }
}
