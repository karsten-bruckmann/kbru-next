import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  autoBockKontraLostFormEffect,
  autoBockKontraReFormEffect,
  bockFormEffect,
  bockSetsFormEffect,
  calculationTypesFormEffect,
  centPerPointFormEffect,
  hirschFormEffect,
  kontraFormEffect,
  maxSetsFormEffect,
  ramschFormEffect,
  ramschJungfrauFormEffect,
  ramschSchiebenFormEffect,
  ramschSetsFormEffect,
  ramschSetsJungfrauFormEffect,
  ramschSetsSchiebenFormEffect,
  reFormEffect,
  saechsischeSpitzeFormEffect,
  spitzenFormEffect,
  thresholdAnnouncementWithoutHandFormEffect,
  updateAvailablePlayersFormEffect,
} from '../form-effects';
import {
  AutoBockKontraLostFormControl,
  AutoBockKontraReFormControl,
  BockSetsFormControl,
  CalculationTypeFormControl,
  CentPerPointFormControl,
  HirschFormControl,
  KontraFormControl,
  MaxSetsFormControl,
  PlayerIdsFormControl,
  RamschFormControl,
  RamschJungfrauFormControl,
  RamschSchiebenFormControl,
  RamschSetsFormControl,
  RamschSetsJungfrauFormControl,
  RamschSetsSchiebenFormControl,
  SaechsischeSpitzeFormControl,
  SpitzenFormControl,
  ThresholdAnnouncementWithoutHandControl,
} from '../models/form-controls';
import { SkatListForm } from '../models/skat-list-form.model';
import {
  autoBockKontraLostValidatorFunction,
  autoBockKontraReValidatorFunction,
  bockSetsValidatorFunction,
  bockValidatorFunction,
  calculationTypeValidatorFunction,
  centPerPointValidatorFunction,
  hirschValidatorFunction,
  kontraValidatorFunction,
  maxSetsValidatorFunction,
  ramschJungfrauValidatorFunction,
  ramschSchiebenValidatorFunction,
  ramschSetsValidatorFunction,
  ramschValidatorFunction,
  reValidatorFunction,
  saechsischeSpitzeValidatorFunction,
  spitzenValidatorFunction,
  thresholdAnnouncementWithoutHandValidatorFunction,
} from '../validator-functions';

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
        kontra: new KontraFormControl(null, kontraValidatorFunction),
        re: new KontraFormControl(null, reValidatorFunction),
        bock: new KontraFormControl(null, bockValidatorFunction),
        hirsch: new HirschFormControl(null, hirschValidatorFunction),
        ramsch: new RamschFormControl(null, ramschValidatorFunction),
        ramschSchieben: new RamschSchiebenFormControl(
          null,
          ramschSchiebenValidatorFunction
        ),
        ramschJungfrau: new RamschJungfrauFormControl(
          null,
          ramschJungfrauValidatorFunction
        ),
        bockSets: new BockSetsFormControl(null, bockSetsValidatorFunction),
        ramschSets: new RamschSetsFormControl(
          null,
          ramschSetsValidatorFunction
        ),
        ramschSetsSchieben: new RamschSetsSchiebenFormControl(
          null,
          ramschSchiebenValidatorFunction
        ),
        ramschSetsJungfrau: new RamschSetsJungfrauFormControl(
          null,
          ramschJungfrauValidatorFunction
        ),
        autoBockKontraRe: new AutoBockKontraReFormControl(
          null,
          autoBockKontraReValidatorFunction
        ),
        autoBockKontraLost: new AutoBockKontraLostFormControl(
          null,
          autoBockKontraLostValidatorFunction
        ),
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
        kontraFormEffect(),
        reFormEffect(),
        bockFormEffect(),
        hirschFormEffect(),
        ramschFormEffect(),
        ramschSchiebenFormEffect(),
        ramschJungfrauFormEffect(),
        bockSetsFormEffect(),
        ramschSetsFormEffect(),
        ramschSetsSchiebenFormEffect(),
        ramschSetsJungfrauFormEffect(),
        autoBockKontraReFormEffect(),
        autoBockKontraLostFormEffect(),
        thresholdAnnouncementWithoutHandFormEffect(),
      ]
    );
  }
}
