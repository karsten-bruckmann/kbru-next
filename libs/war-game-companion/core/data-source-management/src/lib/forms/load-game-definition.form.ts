import { FormControl, FormGroup } from '@angular/forms';

export class LoadGameDefinitionForm extends FormGroup<{
  indexUrl: FormControl<string | null>;
}> {}
