import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { updateAvailablePlayersFormEffect } from '../form-effects/update-available-players.form-effect';
import {
  CalculationTypeControl,
  PlayerIdsControl,
  SkatListForm,
} from '../models/skat-list-form.model';

@Injectable({ providedIn: 'root' })
export class SkatListFormService {
  constructor(private store$: Store) {}

  public getForm$(groupId: string): Observable<SkatListForm> {
    return createEffectAwareForm(
      new SkatListForm({
        groupId: new FormControl<string>(groupId, Validators.required),
        playerIds: new PlayerIdsControl(null),
        calculationType: new CalculationTypeControl('seger-fabian'),
      }),
      [updateAvailablePlayersFormEffect(this.store$)]
    );
  }
}
