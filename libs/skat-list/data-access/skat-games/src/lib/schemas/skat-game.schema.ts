import { z } from 'zod';

export const skatGameSchema = z.object({
  gameType: z.string(),
  playerIndex: z.optional(z.number()),
  spitzen: z.optional(z.number()),
  threshold: z.optional(
    z.union([z.null(), z.literal('schneider'), z.literal('schwarz')])
  ),
  thresholdAnnounced: z.optional(
    z.union([z.null(), z.literal('schneider'), z.literal('schwarz')])
  ),
  nullGameType: z.optional(
    z.union([
      z.literal('einfach'),
      z.literal('hand'),
      z.literal('ouvert'),
      z.literal('hand-ouvert'),
    ])
  ),
});
