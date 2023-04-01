import { FormControl } from '@angular/forms';

export class PlayerIdsFormControl extends FormControl<string[] | null> {
  public possibleValues: string[] = [];
  public getPlayerName: (id: string) => string = () => '';
}
