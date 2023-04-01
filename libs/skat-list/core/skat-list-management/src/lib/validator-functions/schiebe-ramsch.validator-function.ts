import { ValidatorFn } from '@angular/forms';

export const schiebeRamschValidatorFunction: ValidatorFn = (control) => {
  if (typeof control.value !== 'boolean') {
    return { required: true };
  }

  return null;
};
