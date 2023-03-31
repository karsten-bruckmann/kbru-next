import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { GroupForm } from '../models/group-form.model';

@Injectable({ providedIn: 'root' })
export class GroupFormService {
  constructor(private store$: Store) {}

  public get addForm$(): Observable<GroupForm> {
    return of(
      new GroupForm({
        groupName: new FormControl<string>(''),
      })
    );
  }
}
