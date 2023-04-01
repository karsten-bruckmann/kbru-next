import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { PlayerForm } from '../models/player-form.model';
import { playerNameValidatorFunction } from '../validator-functions/player-name.validator-function';

@Injectable({ providedIn: 'root' })
export class PlayerFormService {
  public getAddForm$(groupIds: string[] = []): Observable<PlayerForm> {
    return of(
      new PlayerForm({
        groupIds: new FormControl<string[]>(groupIds),
        playerId: new FormControl<string>(uuid(), Validators.required),
        playerName: new FormControl<string>('', playerNameValidatorFunction),
      })
    );
  }
}
