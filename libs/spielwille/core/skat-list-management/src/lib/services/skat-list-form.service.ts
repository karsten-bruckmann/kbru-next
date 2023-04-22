import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { groupSelector } from '@kbru/spielwille/data-access/groups';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { skatListFormSubmittedAction } from '../actions/skat-list-form-submitted.action';
import { AddOnFormControl } from '../form-controls/add-on.form-control';
import { AutoBockKontraLostFormControl } from '../form-controls/auto-bock-kontra-lost.form-control';
import { AutoBockKontraReFormControl } from '../form-controls/auto-bock-kontra-re.form-control';
import { BockSetsFormControl } from '../form-controls/bock-sets.form-control';
import { CalculationTypeFormControl } from '../form-controls/calculation-type.form-control';
import { CentPerPointFormControl } from '../form-controls/cent-per-point.form-control';
import { GroupIdFormControl } from '../form-controls/group-id.form-control';
import { HirschFormControl } from '../form-controls/hirsch.form-control';
import { KontraFormControl } from '../form-controls/kontra.form-control';
import { MaxSetsFormControl } from '../form-controls/max-sets.form-control';
import { PlayerIdsFormControl } from '../form-controls/player-ids.form-control';
import { RamschFormControl } from '../form-controls/ramsch.form-control';
import { RamschJungfrauFormControl } from '../form-controls/ramsch-jungfrau.form-control';
import { RamschSchiebenFormControl } from '../form-controls/ramsch-schieben.form-control';
import { RamschSetsFormControl } from '../form-controls/ramsch-sets.form-control';
import { RamschSetsJungfrauFormControl } from '../form-controls/ramsch-sets-jungfrau.form-control';
import { RamschSetsSchiebenFormControl } from '../form-controls/ramsch-sets-schieben.form-control';
import { ReFormControl } from '../form-controls/re.form-control';
import { SaechsischeSpitzeFormControl } from '../form-controls/saechsische-spitze.form-control';
import { SpitzenFormControl } from '../form-controls/spitzen.form-control';
import { ThresholdAnnouncementWithoutHandControl } from '../form-controls/threshold-announcement-without-hand.form-control';
import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { getListFromFormGroup } from '../rules/get-list-from-form-group.rule';

@Injectable({ providedIn: 'root' })
export class SkatListFormService {
  constructor(private store$: Store) {}

  public submit(form: SkatListFormGroup): void {
    if (!form.valid) {
      throw new Error('invalid form');
    }

    if (!form.value.groupId) {
      throw new Error('no group id');
    }

    const skatList = getListFromFormGroup(form);

    this.store$.dispatch(
      skatListFormSubmittedAction({
        skatList,
        uuid: uuid(),
        groupId: form.value.groupId,
      })
    );
  }

  public getForm$(groupId: string): Observable<SkatListFormGroup> {
    return this.store$.select(groupSelector(groupId)).pipe(
      filterNullish(),
      switchMap(() =>
        createEffectAwareForm(
          new SkatListFormGroup({
            groupId: new GroupIdFormControl(groupId, {
              asyncValidators: [
                GroupIdFormControl.getAsyncValidator(this.store$),
              ],
            }),
            playerIds: new PlayerIdsFormControl(null, {
              asyncValidators: [
                PlayerIdsFormControl.getAsyncValidator(groupId, this.store$),
              ],
            }),
            addOn: new AddOnFormControl(null, AddOnFormControl.validator),
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
            bockSets: new BockSetsFormControl(
              null,
              BockSetsFormControl.validator
            ),
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
            AddOnFormControl.formEffect(),
            CalculationTypeFormControl.formEffect(),
            SpitzenFormControl.formEffect(),
            SaechsischeSpitzeFormControl.formEffect(),
            MaxSetsFormControl.formEffect(),
            CentPerPointFormControl.formEffect(),
            KontraFormControl.formEffect(),
            ReFormControl.formEffect(),
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
        )
      )
    );
  }
}
