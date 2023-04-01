import { ValidatorFn } from '@angular/forms';

export const spitzenValidatorFunction: ValidatorFn = (control) => {
  if (!control.value) {
    return { required: true };
  }
  if (
    typeof control.value !== 'number' &&
    control.value !== 4 &&
    control.value !== 11
  ) {
    return { type: true };
  }

  return null;
};
