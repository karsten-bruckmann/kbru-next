import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export type FormEffect<T extends FormGroup> = (
  formGroup: T
) => Observable<void>;
