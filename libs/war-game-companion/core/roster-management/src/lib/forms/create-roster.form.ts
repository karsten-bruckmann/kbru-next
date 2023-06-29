import { FormControl, FormGroup } from '@angular/forms';

export class CreateRosterForm extends FormGroup<{
  name: FormControl<string | null>;
}> {
  constructor() {
    super(
      {
        name: new FormControl(''),
      },
      {
        asyncValidators: [
          async (form) => {
            if (!form.value.name) {
              return { invalid: true };
            }

            return null;
          },
        ],
      }
    );
  }
}
