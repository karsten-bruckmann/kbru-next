import { ValidatorFn } from '@angular/forms';

export const groupNameValidatorFunction: ValidatorFn = (control) => {
  if (!control.value) {
    return {
      required: true,
    };
  }
  if (typeof control.value !== 'string') {
    return {
      type: true,
    };
  }
  if (control.value.length < 5 || control.value.length > 50) {
    return {
      length: true,
    };
  }
  if (!control.value.match(/^[0-9a-zA-Z_.-]*$/)) {
    return {
      characters: true,
    };
  }

  return null;
};
