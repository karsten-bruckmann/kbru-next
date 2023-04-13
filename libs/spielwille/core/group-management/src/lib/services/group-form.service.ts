import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { GroupNameFormControl } from '../form-controls/group-name.form-control';
import { GroupFormGroup } from '../form-groups/group.form-group';

@Injectable({ providedIn: 'root' })
export class GroupFormService {
  public get addForm$(): Observable<GroupFormGroup> {
    return of(
      new GroupFormGroup({
        groupId: new FormControl<string>(uuid(), Validators.required),
        groupName: new GroupNameFormControl('', GroupNameFormControl.validator),
      })
    );
  }
}
