import { SkatListStatus } from '@kbru/spielwille/data-access/skat-lists';

import { stringToGameType } from '../models/game-type.model';
import { Status } from '../models/status.model';

export const listStatusFromData = (data: SkatListStatus): Status => ({
  ...data,
  availableGameTypes: Object.keys(data.availableGameTypes)
    .map(Number)
    .reduce(
      (available, key) => ({
        ...available,
        [key]: data.availableGameTypes[key].map((type) =>
          stringToGameType(type)
        ),
      }),
      {}
    ),
});
