import { ValidatorFn } from '@angular/forms';

export const maxSetsValidatorFunction: ValidatorFn = (control) => {
  if (!control.value) {
    return { required: true };
  }
  if (
    control.value !== undefined &&
    control.value !== 1 &&
    control.value !== 3
  ) {
    return { type: true };
  }

  return null;
};
