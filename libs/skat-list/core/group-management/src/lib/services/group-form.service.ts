import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { GroupForm } from '../models/group-form.model';
import { groupNameValidatorFunction } from '../validator-functions/group-name.validator-function';

@Injectable({ providedIn: 'root' })
export class GroupFormService {
  public get addForm$(): Observable<GroupForm> {
    return of(
      new GroupForm({
        groupId: new FormControl<string>(uuid(), Validators.required),
        groupName: new FormControl<string>('', groupNameValidatorFunction),
      })
    );
  }
}
