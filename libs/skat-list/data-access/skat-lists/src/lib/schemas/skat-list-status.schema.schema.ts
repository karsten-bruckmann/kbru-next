import { z } from 'zod';

export type SkatListStatus = z.infer<typeof skatListStatusSchema>;

export const skatListStatusSchema = z.object({
  activePlayers: z.tuple([z.number(), z.number(), z.number()]),
});
