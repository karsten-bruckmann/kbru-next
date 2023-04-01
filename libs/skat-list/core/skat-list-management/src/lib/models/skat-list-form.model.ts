import { FormControl, FormGroup } from '@angular/forms';

export class SkatListForm extends FormGroup<{
  groupId: FormControl<string | null>;
  playerIds: PlayerIdsControl;
  calculationType: CalculationTypeControl;
}> {
  public visibleControls = new Map<keyof SkatListForm['controls'], boolean>([
    ['playerIds', true],
    ['calculationType', true],
  ]);
}

export class PlayerIdsControl extends FormControl<string[] | null> {
  public possibleValues: string[] = [];
  public getPlayerName: (id: string) => string = () => '';
}
export class CalculationTypeControl extends FormControl<
  'seger-fabian' | 'bierlachs' | null
> {
  public possibleValues: 'seger-fabian' | 'bierlachs'[] | null = null;
}
