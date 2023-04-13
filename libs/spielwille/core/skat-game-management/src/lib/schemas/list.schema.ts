import {
  skatListSchema,
  skatListStatusSchema,
} from '@kbru/spielwille/data-access/skat-lists';
import { z } from 'zod';

import { gameSchema } from './game.schema';

export type List = z.infer<typeof listSchema>;
export type Status = List['status'];

export const listSchema = skatListSchema.omit({ playerIds: true }).extend({
  id: z.string().uuid(),
  playerNames: z.array(z.string()).min(3).max(5),
  description: z.string(),
  games: z.array(gameSchema),
  status: skatListStatusSchema,
});
