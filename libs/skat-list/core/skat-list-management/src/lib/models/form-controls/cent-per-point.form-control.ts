import { FormControl } from '@angular/forms';
import { SkatList } from '@kbru/skat-list/data-access/skat-lists';

export class CentPerPointFormControl extends FormControl<
  SkatList['rules']['centPerPoint'] | null
> {
  public possibleValues: SkatList['rules']['centPerPoint'][] = [];
}
