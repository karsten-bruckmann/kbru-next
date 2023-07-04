import { Force } from '@kbru/war-game-companion/data-access/rosters';

import { HydratedSelectionReference } from './hydrated-selection-reference.model';

export type HydratedForce = Force & {
  name: string;
  selections: HydratedSelectionReference[];
};
