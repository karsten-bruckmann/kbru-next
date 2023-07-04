import { SelectionReference } from '@kbru/war-game-companion/data-access/rosters';

export type HydratedSelectionReference = SelectionReference & {
  name: string;
};
