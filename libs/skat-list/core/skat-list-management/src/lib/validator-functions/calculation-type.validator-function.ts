import { ValidatorFn } from '@angular/forms';

export const calculationTypeValidatorFunction: ValidatorFn = (control) => {
  if (!control.value) {
    return { required: true };
  }
  if (
    typeof control.value !== 'string' &&
    control.value !== 'seger-fabian' &&
    control.value !== 'bierlachs'
  ) {
    return { type: true };
  }

  return null;
};
