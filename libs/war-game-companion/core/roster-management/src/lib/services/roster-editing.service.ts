import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  catalogueOpenedAction,
  catalogueSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { Roster } from '@kbru/war-game-companion/data-access/rosters';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';

import { AddForceForm } from '../forms/add-force.form';
import { AddSelectionEntryForm } from '../forms/add-selection-entry.form';
import { CreateRosterForm } from '../forms/create-roster.form';
import { NamedReference } from '../models/named-reference.model';
import { rosterListSelector } from '../selectors/roster-list.selector';

@Injectable({ providedIn: 'root' })
export class RosterEditingService {
  constructor(private readonly store$: Store) {}

  public openCatalogue(catalogueId: string): void {
    this.store$.dispatch(catalogueOpenedAction({ catalogueId }));
  }

  public get catalogueId$(): Observable<string | null> {
    return this.store$
      .select(catalogueSelector)
      .pipe(map((cat) => cat?.id ?? null));
  }

  public get rosterList$(): Observable<NamedReference[]> {
    return this.store$.select(rosterListSelector);
  }

  public getCreateRosterForm$(): Observable<CreateRosterForm> {
    return this.store$.select(catalogueSelector).pipe(
      filterNullish(),
      switchMap((catalogue) =>
        createEffectAwareForm(
          new CreateRosterForm(this.store$, catalogue.id),
          []
        )
      )
    );
  }

  public addForceForm$(rosterId: string): Observable<AddForceForm> {
    return this.store$.select(catalogueSelector).pipe(
      filterNullish(),
      switchMap((catalogue) => {
        const form = new AddForceForm(this.store$, catalogue.id, rosterId);
        return createEffectAwareForm(form, [...form.controls.force.effects]);
      })
    );
  }

  public addSelectionEntryForm$(
    roster: Roster,
    forceIndex: number
  ): Observable<AddSelectionEntryForm> {
    return AddSelectionEntryForm.effectAware(this.store$, roster, forceIndex);
  }
}
