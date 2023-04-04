import { FormGroup } from '@angular/forms';
import { SkatList } from '@kbru/skat-list/data-access/skat-lists';

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
  ReFormControl,
  SaechsischeSpitzeFormControl,
  SpitzenFormControl,
  ThresholdAnnouncementWithoutHandControl,
} from '../form-controls';
import { GroupIdFormControl } from '../form-controls/group-id.form-control';
import { RamschSetsJungfrauFormControl } from '../form-controls/ramsch-sets-jungfrau.form-control';

export class SkatListFormGroup extends FormGroup<{
  groupId: GroupIdFormControl;
  playerIds: PlayerIdsFormControl;
  calculationType: CalculationTypeFormControl;
  spitzen: SpitzenFormControl;
  saechsischeSpitze: SaechsischeSpitzeFormControl;
  maxSets: MaxSetsFormControl;
  centPerPoint: CentPerPointFormControl;
  kontra: KontraFormControl;
  re: ReFormControl;
  bock: BockFormControl;
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
  public get skatList(): SkatList | null {
    if (!this.valid) {
      return null;
    }

    return {
      gameIds: [],
      playerIds: this.value.playerIds || [],
      rules: {
        calculationType: this.value.calculationType || 'seger-fabian',
        maxSets: this.value.maxSets || null,
        centPerPoint: this.value.centPerPoint || 0,
        spitzen: this.value.spitzen || 11,
        saechsischeSpitze: this.value.saechsischeSpitze || false,
        thresholdAnnouncementWithoutHand:
          this.value.thresholdAnnouncementWithoutHand || false,
        maxSpritze: this.value.hirsch
          ? 'hirsch'
          : this.value.bock
          ? 'bock'
          : this.value.re
          ? 're'
          : this.value.kontra
          ? 'kontra'
          : 'none',
        ramsch: this.value.ramsch
          ? {
              geschoben: this.value.ramschSchieben || false,
              jungfrau: this.value.ramschJungfrau || false,
            }
          : false,
        bockSets: this.value.bockSets
          ? {
              kontraRe: this.value.autoBockKontraRe || false,
              kontraLost: this.value.autoBockKontraLost || false,
              ramsch: this.value.ramschSets
                ? {
                    geschoben: this.value.ramschSetsSchieben || false,
                    jungfrau: this.value.ramschSetsJungfrau || false,
                  }
                : false,
            }
          : false,
      },
      status: null,
    };
  }
}
