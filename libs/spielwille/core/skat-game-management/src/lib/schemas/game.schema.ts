import { z } from 'zod';

export type Game = z.infer<typeof gameSchema>;
export type GameType = Game['gameType'];

export type DiamondsGame = z.infer<typeof diamondsGameSchema>;
export type HeartsGame = z.infer<typeof heartsGameSchema>;
export type SpadesGame = z.infer<typeof spadesGameSchema>;
export type ClubsGame = z.infer<typeof clubsGameSchema>;
export type GrandGame = z.infer<typeof grandGameSchema>;
export type StandardGame =
  | DiamondsGame
  | HeartsGame
  | SpadesGame
  | ClubsGame
  | GrandGame;
export type Threshold = StandardGame['threshold'];
export type Spritze = StandardGame['spritze'];

export type NullGame = z.infer<typeof nullGameSchema>;
export type NullType = NullGame['nullType'];

const baseGameSchema = z.object({
  id: z.string(),
});

const baseStandardGameSchema = baseGameSchema.extend({
  playerIndex: z.number(),
  spitzen: z.number(),
  threshold: z
    .nullable(z.union([z.literal('schneider'), z.literal('schwarz')]))
    .default(null),
  thresholdAnnounced: z
    .nullable(z.union([z.literal('schneider'), z.literal('schwarz')]))
    .default(null),
  spritze: z
    .nullable(
      z.union([z.literal('kontra'), z.literal('re'), z.literal('hirsch')])
    )
    .default(null),
});

export const diamondsGameSchema = baseStandardGameSchema.extend({
  gameType: z.literal('diamonds'),
});

export const heartsGameSchema = baseStandardGameSchema.extend({
  gameType: z.literal('hearts'),
});

export const spadesGameSchema = baseStandardGameSchema.extend({
  gameType: z.literal('spades'),
});

export const clubsGameSchema = baseStandardGameSchema.extend({
  gameType: z.literal('clubs'),
});

export const grandGameSchema = baseStandardGameSchema.extend({
  gameType: z.literal('grand'),
});

export const nullGameSchema = baseGameSchema.extend({
  gameType: z.literal('null'),
  playerIndex: z.number(),
  nullType: z.union([
    z.literal('einfach'),
    z.literal('hand'),
    z.literal('ouvert'),
    z.literal('hand-ouvert'),
  ]),
});

export const gameSchema = z.discriminatedUnion('gameType', [
  diamondsGameSchema,
  heartsGameSchema,
  spadesGameSchema,
  clubsGameSchema,
  grandGameSchema,
  nullGameSchema,
]);
