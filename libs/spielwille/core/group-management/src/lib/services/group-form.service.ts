import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { addGroupFormSubmittedAction } from '../actions/add-group-form-submitted.action';
import { GroupNameFormControl } from '../form-controls/group-name.form-control';
import { GroupFormGroup } from '../form-groups/group.form-group';

@Injectable({ providedIn: 'root' })
export class GroupFormService {
  constructor(private store$: Store) {}
  public get addForm$(): Observable<GroupFormGroup> {
    return of(
      new GroupFormGroup({
        groupId: new FormControl<string>(uuid(), Validators.required),
        groupName: new GroupNameFormControl('', GroupNameFormControl.validator),
      })
    );
  }

  public submit(formGroup: GroupFormGroup): void {
    this.store$.dispatch(
      addGroupFormSubmittedAction({
        value: formGroup.value,
        created: new Date(),
      })
    );
  }
}
