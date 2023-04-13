import { z } from 'zod';

import { skatGameSchema } from './skat-game.schema';

export type SkatGamesState = z.infer<typeof skatGamesStateSchema>;

export const skatGamesStateSchema = z.record(skatGameSchema);
