import { FormControl, FormGroup } from '@angular/forms';

import { GroupNameFormControl } from '../form-controls/group-name.form-control';

export class GroupFormGroup extends FormGroup<{
  groupId: FormControl<string | null>;
  groupName: GroupNameFormControl;
}> {}
