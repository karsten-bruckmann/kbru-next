import { FormControl } from '@angular/forms';
import { SkatList } from '@kbru/skat-list/data-access/skat-lists';

export class MaxSetsFormControl extends FormControl<
  SkatList['rules']['maxSets']
> {
  public possibleValues: SkatList['rules']['maxSets'][] = [];
}
