import { Roster as RosterBase } from '@kbru/battle-companion/data-access/rosters';

import { Detachment } from './detachment.model';

export interface Roster extends Omit<RosterBase, 'detachments'> {
  id: string;
  detachments: Detachment[];
}
