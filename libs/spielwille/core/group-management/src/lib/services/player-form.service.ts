import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { addPlayerFormSubmittedAction } from '../actions/add-player-form-submitted.action';
import { PlayerNameFormControl } from '../form-controls/player-name.form-control';
import { PlayerFormGroup } from '../form-groups/player.form-group';

@Injectable({ providedIn: 'root' })
export class PlayerFormService {
  constructor(private store$: Store) {}

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

  public submit(formGroup: PlayerFormGroup): void {
    this.store$.dispatch(
      addPlayerFormSubmittedAction({
        value: formGroup.value,
      })
    );
  }
}
