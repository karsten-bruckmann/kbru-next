import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import {
  repositoryNameSelector,
  repositoryOpenedAction,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { addForceFormSubmitted } from '../actions/add-force-form-submitted.action';
import { createRosterFormSubmittedAction } from '../actions/create-roster-form-submitted.action';
import { AddForceForm } from '../forms/add-force.form';
import { AddSelectionEntryForm } from '../forms/add-selection-entry.form';
import { CreateRosterForm } from '../forms/create-roster.form';

@Injectable({ providedIn: 'root' })
export class RosterEditingService {
  constructor(private readonly store$: Store) {}

  public openRepository(repositoryName: string): void {
    this.store$.dispatch(repositoryOpenedAction({ repositoryName }));
  }

  public get repositoryName$() {
    return this.store$.select(repositoryNameSelector);
  }

  public getCreateRosterForm$(): Observable<CreateRosterForm> {
    return createEffectAwareForm(new CreateRosterForm(), []);
  }

  public submitCreateForm(
    form: CreateRosterForm,
    repositoryName: string
  ): void {
    const { name } = form.value;
    if (!name) {
      return;
    }

    this.store$.dispatch(
      createRosterFormSubmittedAction({
        repositoryName,
        rosterName: name,
      })
    );
  }

  public addForceForm$(): Observable<AddForceForm> {
    const form = new AddForceForm(this.store$);
    return createEffectAwareForm(form, [...form.controls.forceId.effects]);
  }

  public submitAddForceForm(
    form: AddForceForm,
    repositoryName: string,
    rosterId: string
  ): void {
    const { catalogueId, forceId } = form.value;
    if (!forceId || !catalogueId) {
      return;
    }

    this.store$.dispatch(
      addForceFormSubmitted({
        repositoryName,
        value: { catalogueId, forceId, rosterId: rosterId },
      })
    );
  }

  public addSelectionEntryForm$(
    rosterId: string,
    repositoryName: string,
    forceIndex: number
  ): Observable<AddSelectionEntryForm> {
    const form = new AddSelectionEntryForm(
      this.store$,
      repositoryName,
      rosterId,
      forceIndex
    );
    return createEffectAwareForm(form, [...form.controls.entryLinkId.effects]);
  }
}
