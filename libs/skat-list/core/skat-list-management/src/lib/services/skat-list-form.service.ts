import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { calculationTypesFormEffect } from '../form-effects/calculation-types.form-effect';
import { centPerPointFormEffect } from '../form-effects/cent-per-point.form-effect';
import { hirschFormEffect } from '../form-effects/hirsch.form-effect';
import { jungfrauFormEffect } from '../form-effects/jungfrau.form-effect';
import { kontraReFormEffect } from '../form-effects/kontra-re.form-effect';
import { maxSetsFormEffect } from '../form-effects/max-sets.form-effect';
import { saechsischeSpitzeFormEffect } from '../form-effects/saechsische-spitze.form-effect';
import { schiebeRamschFormEffect } from '../form-effects/schiebe-ramsch.form-effect';
import { spitzenFormEffect } from '../form-effects/spitzen.form-effect';
import { thresholdAnnouncementWithoutHandFormEffect } from '../form-effects/threshold-announcement-without-hand.form-effect';
import { updateAvailablePlayersFormEffect } from '../form-effects/update-available-players.form-effect';
import { CalculationTypeFormControl } from '../models/form-controls/calculation-type.form-control';
import { CentPerPointFormControl } from '../models/form-controls/cent-per-point.form-control';
import { HirschFormControl } from '../models/form-controls/hirsch.form-control';
import { JungfrauFormControl } from '../models/form-controls/jungfrau.form-control';
import { KontraReFormControl } from '../models/form-controls/kontra-re.form-control';
import { MaxSetsFormControl } from '../models/form-controls/max-sets.form-control';
import { PlayerIdsFormControl } from '../models/form-controls/player-ids.form-control';
import { RamschFormControl } from '../models/form-controls/ramsch.form-control';
import { SaechsischeSpitzeFormControl } from '../models/form-controls/saechsische-spitze.form-control';
import { SchiebeRamschFormControl } from '../models/form-controls/schiebe-ramsch.form-control';
import { SpitzenFormControl } from '../models/form-controls/spitzen.form-control';
import { ThresholdAnnouncementWithoutHandControl } from '../models/form-controls/threshold-announcement-without-hand.form-control';
import { SkatListForm } from '../models/skat-list-form.model';
import { calculationTypeValidatorFunction } from '../validator-functions/calculation-type.validator-function';
import { centPerPointValidatorFunction } from '../validator-functions/cent-per-point.validator-function';
import { hirschValidatorFunction } from '../validator-functions/hirsch.validator-function';
import { jungfrauValidatorFunction } from '../validator-functions/jungfrau.validator-function';
import { kontraReValidatorFunction } from '../validator-functions/kontra-re.validator-function';
import { maxSetsValidatorFunction } from '../validator-functions/max-sets.validator-function';
import { ramschValidatorFunction } from '../validator-functions/ramsch.validator-function';
import { saechsischeSpitzeValidatorFunction } from '../validator-functions/saechsische-spitze.validator-function';
import { schiebeRamschValidatorFunction } from '../validator-functions/schiebe-ramsch.validator-function';
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
        saechsischeSpitze: new SaechsischeSpitzeFormControl(
          null,
          saechsischeSpitzeValidatorFunction
        ),
        maxSets: new MaxSetsFormControl(null, maxSetsValidatorFunction),
        centPerPoint: new CentPerPointFormControl(
          null,
          centPerPointValidatorFunction
        ),
        kontraRe: new KontraReFormControl(null, kontraReValidatorFunction),
        hirsch: new HirschFormControl(null, hirschValidatorFunction),
        ramsch: new RamschFormControl(null, ramschValidatorFunction),
        schiebeRamsch: new SchiebeRamschFormControl(
          null,
          schiebeRamschValidatorFunction
        ),
        jungfrau: new JungfrauFormControl(null, jungfrauValidatorFunction),
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
        saechsischeSpitzeFormEffect(),
        maxSetsFormEffect(),
        centPerPointFormEffect(),
        kontraReFormEffect(),
        hirschFormEffect(),
        schiebeRamschFormEffect(),
        schiebeRamschFormEffect(),
        jungfrauFormEffect(),
        thresholdAnnouncementWithoutHandFormEffect(),
      ]
    );
  }
}
