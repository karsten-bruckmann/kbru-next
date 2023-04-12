import { z } from 'zod';

import { gameSchema } from '../schemas/game.schema';

export type Game = z.infer<typeof gameSchema>;

export type GameType = Game['gameType'];
