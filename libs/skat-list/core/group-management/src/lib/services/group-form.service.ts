import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GroupForm } from '../models/group-form.model';
import { groupNameValidatorFunction } from '../validator-functions/group-name.validator-function';

@Injectable({ providedIn: 'root' })
export class GroupFormService {
  public get addForm$(): Observable<GroupForm> {
    return of(
      new GroupForm({
        groupName: new FormControl<string>('', groupNameValidatorFunction),
      })
    );
  }
}
