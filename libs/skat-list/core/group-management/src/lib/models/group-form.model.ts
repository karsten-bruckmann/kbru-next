import { FormControl, FormGroup } from '@angular/forms';

export class GroupForm extends FormGroup<{
  groupName: FormControl<string | null>;
}> {}
