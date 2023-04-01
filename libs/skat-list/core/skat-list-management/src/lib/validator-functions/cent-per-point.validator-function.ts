import { ValidatorFn } from '@angular/forms';

export const centPerPointValidatorFunction: ValidatorFn = (control) => {
  if (!control.value) {
    return { required: true };
  }
  if (
    control.value !== 0 &&
    control.value !== 1 &&
    control.value !== 0.5 &&
    control.value !== 0.25 &&
    control.value !== 0.1
  ) {
    return { type: true };
  }

  return null;
};
