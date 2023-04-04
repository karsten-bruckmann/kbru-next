import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  AutoBockKontraLostFormControl,
  AutoBockKontraReFormControl,
  BockFormControl,
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
  ReFormControl,
  SaechsischeSpitzeFormControl,
  SpitzenFormControl,
  ThresholdAnnouncementWithoutHandControl,
} from '../form-controls';
import { GroupIdFormControl } from '../form-controls/group-id.form-control';
import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

@Injectable({ providedIn: 'root' })
export class SkatListFormService {
  constructor(private store$: Store) {}

  public getForm$(groupId: string): Observable<SkatListFormGroup> {
    return createEffectAwareForm(
      new SkatListFormGroup({
        groupId: new GroupIdFormControl(groupId, {
          asyncValidators: [GroupIdFormControl.getAsyncValidator(this.store$)],
        }),
        playerIds: new PlayerIdsFormControl(null, {
          asyncValidators: [
            PlayerIdsFormControl.getAsyncValidator(groupId, this.store$),
          ],
        }),
        calculationType: new CalculationTypeFormControl(
          null,
          CalculationTypeFormControl.validator
        ),
        spitzen: new SpitzenFormControl(null, SpitzenFormControl.validator),
        saechsischeSpitze: new SaechsischeSpitzeFormControl(
          null,
          SaechsischeSpitzeFormControl.validator
        ),
        maxSets: new MaxSetsFormControl(null, MaxSetsFormControl.validator),
        centPerPoint: new CentPerPointFormControl(
          null,
          CentPerPointFormControl.validator
        ),
        kontra: new KontraFormControl(null, KontraFormControl.validator),
        re: new KontraFormControl(null, KontraFormControl.validator),
        bock: new KontraFormControl(null, KontraFormControl.validator),
        hirsch: new HirschFormControl(null, HirschFormControl.validator),
        ramsch: new RamschFormControl(null, RamschFormControl.validator),
        ramschSchieben: new RamschSchiebenFormControl(
          null,
          RamschSchiebenFormControl.validator
        ),
        ramschJungfrau: new RamschJungfrauFormControl(
          null,
          RamschJungfrauFormControl.validator
        ),
        bockSets: new BockSetsFormControl(null, BockSetsFormControl.validator),
        ramschSets: new RamschSetsFormControl(
          null,
          RamschSetsFormControl.validator
        ),
        ramschSetsSchieben: new RamschSetsSchiebenFormControl(
          null,
          RamschSetsSchiebenFormControl.validator
        ),
        ramschSetsJungfrau: new RamschSetsJungfrauFormControl(
          null,
          RamschSetsJungfrauFormControl.validator
        ),
        autoBockKontraRe: new AutoBockKontraReFormControl(
          null,
          AutoBockKontraReFormControl.validator
        ),
        autoBockKontraLost: new AutoBockKontraLostFormControl(
          null,
          AutoBockKontraLostFormControl.validator
        ),
        thresholdAnnouncementWithoutHand:
          new ThresholdAnnouncementWithoutHandControl(
            null,
            ThresholdAnnouncementWithoutHandControl.validator
          ),
      }),
      [
        PlayerIdsFormControl.formEffect(this.store$),
        CalculationTypeFormControl.formEffect(),
        SpitzenFormControl.formEffect(),
        SaechsischeSpitzeFormControl.formEffect(),
        MaxSetsFormControl.formEffect(),
        CentPerPointFormControl.formEffect(),
        KontraFormControl.formEffect(),
        ReFormControl.formEffect(),
        BockFormControl.formEffect(),
        HirschFormControl.formEffect(),
        RamschFormControl.formEffect(),
        RamschSchiebenFormControl.formEffect(),
        RamschJungfrauFormControl.formEffect(),
        BockSetsFormControl.formEffect(),
        RamschSetsFormControl.formEffect(),
        RamschSetsSchiebenFormControl.formEffect(),
        RamschSetsJungfrauFormControl.formEffect(),
        AutoBockKontraReFormControl.formEffect(),
        AutoBockKontraLostFormControl.formEffect(),
        ThresholdAnnouncementWithoutHandControl.formEffect(),
      ]
    );
  }
}
