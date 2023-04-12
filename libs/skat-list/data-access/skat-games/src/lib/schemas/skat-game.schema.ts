import { z } from 'zod';

export const skatGameSchema = z.object({
  gameType: z.string(),
  playerIndex: z.optional(z.number()),
  spitzen: z.optional(z.number()),
  nullGame: z.optional(
    z.union([
      z.literal('einfach'),
      z.literal('hand'),
      z.literal('ouvert'),
      z.literal('hand-ouvert'),
    ])
  ),
});
