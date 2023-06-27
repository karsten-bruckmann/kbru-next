import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { createRosterFormSubmitted } from '../actions/create-roster-form-submitted.action';
import { CreateRosterForm } from '../forms/create-roster.form';

@Injectable({ providedIn: 'root' })
export class RosterFormsService {
  constructor(
    private readonly store$: Store,
    private createRosterForm: CreateRosterForm
  ) {}

  public get create$(): Observable<CreateRosterForm> {
    return createEffectAwareForm(this.createRosterForm, [
      ...this.createRosterForm.controls.catalogueId.effects,
      ...this.createRosterForm.controls.forceId.effects,
    ]);
  }

  public submitCreateForm(form: CreateRosterForm): void {
    const { name, gameSystemId, catalogueId, forceId } = form.value;
    if (!name || !gameSystemId || !catalogueId || !forceId) {
      return;
    }

    this.store$.dispatch(
      createRosterFormSubmitted({
        value: { name, gameSystemId, catalogueId, forceId },
      })
    );
  }
}
