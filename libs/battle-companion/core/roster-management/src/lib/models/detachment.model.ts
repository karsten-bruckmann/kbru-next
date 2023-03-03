import { Detachment as DetachmentBase } from '@kbru/battle-companion/data-access/rosters';

import { Unit } from './unit.model';

export type Detachment = Omit<DetachmentBase, 'units'> & {
  units: Unit[];
};
