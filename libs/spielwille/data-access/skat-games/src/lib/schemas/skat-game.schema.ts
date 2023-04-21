import { z } from 'zod';

export type SkatGame = z.infer<typeof skatGameSchema>;

export const skatGameSchema = z.object({
  gameType: z.string(),
  playerIndex: z.number(),
  addsBockSet: z.boolean(),
  spitzen: z.optional(z.number()),
  threshold: z.optional(
    z.nullable(z.union([z.literal('schneider'), z.literal('schwarz')]))
  ),
  thresholdAnnounced: z.optional(
    z.nullable(z.union([z.literal('schneider'), z.literal('schwarz')]))
  ),
  spritze: z.optional(
    z.nullable(
      z.union([z.literal('kontra'), z.literal('re'), z.literal('hirsch')])
    )
  ),
  nullType: z.optional(
    z.nullable(
      z.union([
        z.literal('einfach'),
        z.literal('hand'),
        z.literal('ouvert'),
        z.literal('hand-ouvert'),
      ])
    )
  ),
  ramschPoints: z.optional(z.number()),
  won: z.optional(z.boolean()),
});
