import { ValidatorFn } from '@angular/forms';

export const autoBockKontraLostValidatorFunction: ValidatorFn = (control) => {
  if (typeof control.value !== 'boolean') {
    return { required: true };
  }

  return null;
};
