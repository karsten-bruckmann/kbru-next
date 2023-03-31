import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { manageFields } from '../form-effects/manage-fields.form-effect';
import {
  CalculationTypeControl,
  PlayerIdsControl,
  SkatListForm,
} from '../models/skat-list-form.model';

@Injectable({ providedIn: 'root' })
export class SkatListFormService {
  constructor(private store$: Store) {}

  public get form$(): Observable<SkatListForm> {
    return createEffectAwareForm(
      new SkatListForm({
        playerIds: new PlayerIdsControl(null),
        calculationType: new CalculationTypeControl('seger-fabian'),
      }),
      [manageFields]
    );
  }
}
