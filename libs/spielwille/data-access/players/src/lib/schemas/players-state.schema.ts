import { z } from 'zod';

import { playerSchema } from './player.schema';

export type PlayersState = z.infer<typeof playersStateSchema>;

export const playersStateSchema = z.record(playerSchema);
