import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, ReplaySubject, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { listStandardSavedAction } from '../actions/list-standard-saved.action';
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
import { getRulesFromFormGroup } from '../rules/get-rules-from-form-group.rule';
import { listStandardSelector } from '../selectors/list-standard.selector';
import { listStandardNamesSelector } from '../selectors/list-standard-names.selector';

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

  private groupId$ = new ReplaySubject<string>(1);

  public submit(): void {
    if (!this.valid) {
      throw new Error('invalid form');
    }

    if (!this.value.groupId) {
      throw new Error('no group id');
    }

    const skatList = getListFromFormGroup(this);

    this.store$.dispatch(
      skatListFormSubmittedAction({
        skatList,
        uuid: uuid(),
        groupId: this.value.groupId,
      })
    );
  }

  public saveStandard(name: string): void {
    if (!this.value.groupId) {
      throw new Error('no group id');
    }

    const rules = getRulesFromFormGroup(this);

    this.store$.dispatch(
      listStandardSavedAction({
        rules,
        groupId: this.value.groupId,
        name,
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
    this.groupId$.next(groupId);
    return this.effectAware$;
  }

  public get standards$(): Observable<string[]> {
    return this.groupId$.pipe(
      switchMap((groupId) =>
        this.store$.select(listStandardNamesSelector(groupId))
      )
    );
  }

  public async load(standardName: string): Promise<void> {
    const groupId = await firstValueFrom(this.groupId$);
    const standard = await firstValueFrom(
      this.store$.select(listStandardSelector(groupId, standardName))
    );
    if (!standard) {
      throw new Error('invalid standard');
    }

    this.patchValue({
      groupId: groupId,
      addOn: standard.addOn,
      bockSets: !!standard.bockSets,
      autoBockKontraLost: standard.bockSets
        ? standard.bockSets.kontraLost
        : false,
      autoBockKontraRe: standard.bockSets ? standard.bockSets.kontraRe : false,
      ramschSets: standard.bockSets ? !!standard.bockSets.ramsch : false,
      ramschSetsJungfrau:
        standard.bockSets && standard.bockSets.ramsch
          ? standard.bockSets.ramsch.jungfrau
          : false,
      ramschSetsSchieben:
        standard.bockSets && standard.bockSets.ramsch
          ? standard.bockSets.ramsch.geschoben
          : false,
      calculationType: standard.calculationType,
      centPerPoint: standard.centPerPoint,
      kontra:
        standard.maxSpritze === 'kontra' ||
        standard.maxSpritze === 're' ||
        standard.maxSpritze === 'hirsch',
      re: standard.maxSpritze === 're' || standard.maxSpritze === 'hirsch',
      hirsch: standard.maxSpritze === 'hirsch',
      maxSets: standard.maxSets,
      playerIds: [],
      ramsch: !!standard.ramsch,
      ramschJungfrau: standard.ramsch ? standard.ramsch.jungfrau : false,
      ramschSchieben: standard.ramsch ? standard.ramsch.geschoben : false,
      saechsischeSpitze: standard.saechsischeSpitze,
      spitzen: standard.spitzen,
      thresholdAnnouncementWithoutHand:
        standard.thresholdAnnouncementWithoutHand,
    });
  }
}
