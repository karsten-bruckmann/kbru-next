import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';

import { addForceFormSubmitted } from '../actions/add-force-form-submitted.action';
import { createRosterFormSubmittedAction } from '../actions/create-roster-form-submitted.action';
import { AddForceForm } from '../forms/add-force.form';
import { CreateRosterForm } from '../forms/create-roster.form';
import { Roster } from '../models/roster.model';
import { rosterSelector } from '../selectors/roster.selector';

@Injectable({ providedIn: 'root' })
export class RosterEditingService {
  constructor(private readonly store$: Store) {}

  public get createRosterForm$(): Observable<CreateRosterForm> {
    return createEffectAwareForm(new CreateRosterForm(this.store$), []);
  }

  public submitCreateForm(form: CreateRosterForm): void {
    const { name, gameSystemId } = form.value;
    if (!name || !gameSystemId) {
      return;
    }

    this.store$.dispatch(
      createRosterFormSubmittedAction({
        value: { name, gameSystemId },
      })
    );
  }

  public addForceForm$(rosterId: string): Observable<AddForceForm> {
    return this.store$.select(rosterSelector(rosterId)).pipe(
      filterNullish(),
      switchMap((roster) => {
        const form = new AddForceForm(this.store$, roster?.gameSystemId);
        return createEffectAwareForm(form, [...form.controls.forceId.effects]);
      })
    );
  }

  public submitAddForceForm(form: AddForceForm, rosterId: string): void {
    const { catalogueId, forceId } = form.value;
    if (!forceId || !catalogueId) {
      return;
    }

    this.store$.dispatch(
      addForceFormSubmitted({
        value: { catalogueId, forceId, rosterId: rosterId },
      })
    );
  }
}
