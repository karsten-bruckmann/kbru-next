import { Roster } from '@kbru/war-game-companion/data-access/rosters';

import { HydratedForce } from './hydrated-force.model';

export type HydratedRoster = Roster & {
  name: string;
  forces: HydratedForce[];
};
