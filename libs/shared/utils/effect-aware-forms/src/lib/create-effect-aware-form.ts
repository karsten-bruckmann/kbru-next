import { FormGroup } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
} from 'rxjs/operators';

import { FormEffect } from './form-effect.type';

export const createEffectAwareForm = <T extends FormGroup>(
  control: T,
  effects: FormEffect<T>[]
): Observable<T> => {
  return merge(...effects.map((effect) => effect(control))).pipe(
    map(() => control),
    startWith(control),
    distinctUntilChanged(() => true),
    shareReplay({ bufferSize: 1, refCount: true })
  );
};
