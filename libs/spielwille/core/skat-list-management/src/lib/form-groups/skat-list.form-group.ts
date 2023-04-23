import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
import { getListFromFormGroup } from '../rules/get-list-from-form-group.rule';

@Injectable({ providedIn: 'root' })
export class SkatListFormGroup extends FormGroup<{
  groupId: GroupIdFormControl;
  playerIds: PlayerIdsFormControl;
  addOn: AddOnFormControl;
  calculationType: CalculationTypeFormControl;
  spitzen: SpitzenFormControl;
  saechsischeSpitze: SaechsischeSpitzeFormControl;
  maxSets: MaxSetsFormControl;
  centPerPoint: CentPerPointFormControl;
  kontra: KontraFormControl;
  re: ReFormControl;
  hirsch: HirschFormControl;
  ramsch: RamschFormControl;
  ramschSchieben: RamschSchiebenFormControl;
  ramschJungfrau: RamschJungfrauFormControl;
  bockSets: BockSetsFormControl;
  ramschSets: RamschFormControl;
  ramschSetsSchieben: RamschSchiebenFormControl;
  ramschSetsJungfrau: RamschSetsJungfrauFormControl;
  autoBockKontraRe: AutoBockKontraReFormControl;
  autoBockKontraLost: AutoBockKontraLostFormControl;
  thresholdAnnouncementWithoutHand: ThresholdAnnouncementWithoutHandControl;
}> {
  constructor(
    private store$: Store,
    private groupIdFormControl: GroupIdFormControl,
    private playerIdsFormControl: PlayerIdsFormControl,
    private addOnFormControl: AddOnFormControl,
    private calculationTypeFormControl: CalculationTypeFormControl,
    private spitzenFormControl: SpitzenFormControl,
    private saechsischeSpitzeFormControl: SaechsischeSpitzeFormControl,
    private maxSetsFormControl: MaxSetsFormControl,
    private centPerPointFormControl: CentPerPointFormControl,
    private kontraFormControl: KontraFormControl,
    private reFormControl: ReFormControl,
    private hirschFormControl: HirschFormControl,
    private ramschFormControl: RamschFormControl,
    private ramschSchiebenFormControl: RamschSchiebenFormControl,
    private ramschJungfrauFormControl: RamschJungfrauFormControl,
    private bockSetsFormControl: BockSetsFormControl,
    private ramschSetsFormControl: RamschSetsFormControl,
    private ramschSetsSchiebenFormControl: RamschSetsSchiebenFormControl,
    private ramschSetsJungfrauFormControl: RamschSetsJungfrauFormControl,
    private autoBockKontraReFormControl: AutoBockKontraReFormControl,
    private autoBockKontraLostFormControl: AutoBockKontraLostFormControl,
    private thresholdAnnouncementWithoutHandFormControl: ThresholdAnnouncementWithoutHandControl
  ) {
    super({
      groupId: groupIdFormControl,
      playerIds: playerIdsFormControl,
      addOn: addOnFormControl,
      calculationType: calculationTypeFormControl,
      spitzen: spitzenFormControl,
      saechsischeSpitze: saechsischeSpitzeFormControl,
      maxSets: maxSetsFormControl,
      centPerPoint: centPerPointFormControl,
      kontra: kontraFormControl,
      re: reFormControl,
      hirsch: hirschFormControl,
      ramsch: ramschFormControl,
      ramschSchieben: ramschSchiebenFormControl,
      ramschJungfrau: ramschJungfrauFormControl,
      bockSets: bockSetsFormControl,
      ramschSets: ramschSetsFormControl,
      ramschSetsSchieben: ramschSetsSchiebenFormControl,
      ramschSetsJungfrau: ramschSetsJungfrauFormControl,
      autoBockKontraRe: autoBockKontraReFormControl,
      autoBockKontraLost: autoBockKontraLostFormControl,
      thresholdAnnouncementWithoutHand:
        thresholdAnnouncementWithoutHandFormControl,
    });
  }

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

  private get effectAware$(): Observable<SkatListFormGroup> {
    return createEffectAwareForm(this, [
      this.groupIdFormControl.formEffect(),
      this.playerIdsFormControl.formEffect(),
      this.addOnFormControl.formEffect(),
      this.calculationTypeFormControl.formEffect(),
      this.spitzenFormControl.formEffect(),
      this.saechsischeSpitzeFormControl.formEffect(),
      this.maxSetsFormControl.formEffect(),
      this.centPerPointFormControl.formEffect(),
      this.kontraFormControl.formEffect(),
      this.reFormControl.formEffect(),
      this.hirschFormControl.formEffect(),
      this.ramschFormControl.formEffect(),
      this.ramschSchiebenFormControl.formEffect(),
      this.ramschJungfrauFormControl.formEffect(),
      this.bockSetsFormControl.formEffect(),
      this.ramschSetsFormControl.formEffect(),
      this.ramschSetsSchiebenFormControl.formEffect(),
      this.ramschSetsJungfrauFormControl.formEffect(),
      this.autoBockKontraReFormControl.formEffect(),
      this.autoBockKontraLostFormControl.formEffect(),
      this.thresholdAnnouncementWithoutHandFormControl.formEffect(),
    ]);
  }

  public forGroup$(groupId: string): Observable<SkatListFormGroup> {
    this.patchValue({ groupId });
    return this.effectAware$;
  }
}
