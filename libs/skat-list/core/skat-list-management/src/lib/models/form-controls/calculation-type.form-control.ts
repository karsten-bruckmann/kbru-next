import { FormControl } from '@angular/forms';
import { SkatList } from '@kbru/skat-list/data-access/skat-lists';

export class CalculationTypeFormControl extends FormControl<
  SkatList['rules']['calculationType'][] | null
> {
  public possibleValues: SkatList['rules']['calculationType'][] = [];
}
