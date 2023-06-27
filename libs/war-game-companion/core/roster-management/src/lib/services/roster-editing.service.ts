import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { addForceFormSubmitted } from '../actions/add-force-form-submitted.action';
import { createRosterFormSubmitted } from '../actions/create-roster-form-submitted.action';
import { AddForceForm } from '../forms/add-force.form';
import { CreateRosterForm } from '../forms/create-roster.form';
import { rosterForcesSelector } from '../selectors/roster-forces.selector';

@Injectable({ providedIn: 'root' })
export class RosterEditingService {
  constructor(
    private readonly store$: Store,
    private createRosterForm: CreateRosterForm
  ) {}

  public get createRosterForm$(): Observable<CreateRosterForm> {
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

  public forces$(rosterId: string): Observable<{ id: string; name: string }[]> {
    return this.store$.select(rosterForcesSelector(rosterId));
  }

  public addForceForm$(rosterId: string): Observable<AddForceForm> {
    return createEffectAwareForm(new AddForceForm(this.store$, rosterId), []);
  }

  public submitAddForceForm(form: AddForceForm): void {
    const { forceId } = form.value;
    if (!forceId) {
      return;
    }

    this.store$.dispatch(
      addForceFormSubmitted({
        value: { forceId, rosterId: form.rosterId },
      })
    );
  }
}
