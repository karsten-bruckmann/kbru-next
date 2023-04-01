import { ValidatorFn } from '@angular/forms';

export const ramschValidatorFunction: ValidatorFn = (control) => {
  if (typeof control.value !== 'boolean') {
    return { required: true };
  }

  return null;
};
