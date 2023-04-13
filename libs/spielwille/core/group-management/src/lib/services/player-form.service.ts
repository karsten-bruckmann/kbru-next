import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { PlayerNameFormControl } from '../form-controls/player-name.form-control';
import { PlayerFormGroup } from '../form-groups/player.form-group';

@Injectable({ providedIn: 'root' })
export class PlayerFormService {
  public getAddForm$(groupIds: string[] = []): Observable<PlayerFormGroup> {
    return of(
      new PlayerFormGroup({
        groupIds: new FormControl<string[]>(groupIds),
        playerId: new FormControl<string>(uuid(), Validators.required),
        playerName: new PlayerNameFormControl(
          '',
          PlayerNameFormControl.validator
        ),
      })
    );
  }
}
