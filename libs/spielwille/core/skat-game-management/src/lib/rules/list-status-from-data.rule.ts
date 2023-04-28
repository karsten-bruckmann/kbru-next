import { SkatListStatus } from '@kbru/spielwille/data-access/skat-lists';

import { Status } from '../models/status.model';
import { safeAvailableGameTypes } from './safe-available-game-types.rule';

export const listStatusFromData = (data: SkatListStatus): Status => ({
  ...data,
  availableGameTypes: data.availableGameTypes
    ? safeAvailableGameTypes(data.availableGameTypes)
    : [],
});
