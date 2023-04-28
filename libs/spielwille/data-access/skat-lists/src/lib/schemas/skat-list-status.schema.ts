import { z } from 'zod';

export type SkatListStatus = z.infer<typeof skatListStatusSchema>;

export const skatListStatusSchema = z.object({
  fixedSets: z.array(
    z.object({
      type: z.union([z.literal('bock'), z.literal('ramsch')]),
      remainingGames: z.number(),
    })
  ),
});
