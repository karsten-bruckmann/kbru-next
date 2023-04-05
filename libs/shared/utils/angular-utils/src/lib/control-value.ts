import { AbstractControl } from '@angular/forms';
import { Observable, startWith } from 'rxjs';

export const controlValue$ = <T extends AbstractControl>(
  control: T
): Observable<T['value']> =>
  control.valueChanges.pipe(startWith(control.value));
