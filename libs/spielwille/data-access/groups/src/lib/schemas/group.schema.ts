import { z } from 'zod';

import { standardSchema } from './standard.schema';

export type Group = z.infer<typeof groupSchema>;

export const groupSchema = z.object({
  name: z.string(),
  created: z.string().datetime({ offset: true }),
  playerIds: z.array(z.string()),
  listIds: z.array(z.string()),
  standards: z.record(standardSchema).default({}),
});
