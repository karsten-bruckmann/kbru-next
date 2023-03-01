import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { addRosterFormSubmitted } from '../actions/add-roster-form/add-roster-form-submitted.action';

export interface RosterForm {
  roszFile: FormControl<File | null>;
}

@Injectable({ providedIn: 'root' })
export class AddRosterForm {
  constructor(private store$: Store) {}

  public get(): FormGroup<RosterForm> {
    return new FormGroup({
      roszFile: new FormControl<File | null>(null, (control) =>
        control.value ? null : { empty: true }
      ),
    });
  }

  public submit(form: FormGroup<RosterForm>): void {
    if (!form.valid || !form.controls.roszFile.value) {
      return;
    }
    this.store$.dispatch(
      addRosterFormSubmitted({ file: form.controls.roszFile.value })
    );
  }
}
