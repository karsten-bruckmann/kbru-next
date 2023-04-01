import { FormControl } from '@angular/forms';
import { SkatList } from '@kbru/skat-list/data-access/skat-lists';

export class SpitzenFormControl extends FormControl<
  SkatList['rules']['spitzen'][] | null
> {
  public possibleValues: SkatList['rules']['spitzen'][] = [];
}
