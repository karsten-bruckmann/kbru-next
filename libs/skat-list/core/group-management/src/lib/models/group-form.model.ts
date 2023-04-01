import { FormControl, FormGroup } from '@angular/forms';

export class GroupForm extends FormGroup<{
  groupId: FormControl<string | null>;
  groupName: FormControl<string | null>;
}> {}
