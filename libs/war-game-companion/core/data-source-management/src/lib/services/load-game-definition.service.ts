import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadGameDefinitionFormSubmittedAction } from '../actions/load-game-definition-form-submitted.action';
import { LoadGameDefinitionForm } from '../forms/load-game-definition.form';

@Injectable({ providedIn: 'root' })
export class LoadGameDefinitionService {
  constructor(private store$: Store) {}

  public get form$(): Observable<LoadGameDefinitionForm> {
    return createEffectAwareForm(
      new LoadGameDefinitionForm({
        indexUrl: new FormControl(''),
      }),
      []
    );
  }

  public submit(form: LoadGameDefinitionForm): void {
    if (!form.valid) {
      return;
    }

    const indexUrl = form.value.indexUrl;
    if (!indexUrl) {
      return;
    }

    this.store$.dispatch(loadGameDefinitionFormSubmittedAction({ indexUrl }));
  }
}
