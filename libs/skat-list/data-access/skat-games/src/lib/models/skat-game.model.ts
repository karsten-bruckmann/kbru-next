import { z } from 'zod';

import { skatGameSchema } from '../schemas/skat-game.schema';

export type SkatGame = z.infer<typeof skatGameSchema>;
