import { z } from 'zod';

export type SkatListStatus = z.infer<typeof skatListStatusSchema>;

export const skatListStatusSchema = z.object({
  activePlayers: z.tuple([z.number(), z.number(), z.number()]),
  availableGameTypes: z.record(z.number(), z.array(z.string())),
  fixedSets: z.array(
    z.object({
      type: z.union([z.literal('bock'), z.literal('ramsch')]),
      remainingGames: z.number(),
    })
  ),
});
