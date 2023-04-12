import { z } from 'zod';

const baseGameSchema = z.object({
  id: z.string(),
});

const baseStandardGameSchema = baseGameSchema.extend({
  playerIndex: z.number(),
  spitzen: z.number(),
});

const diamondsGameSchema = baseStandardGameSchema.extend({
  gameType: z.literal('diamonds'),
});

const heartsGameSchema = baseStandardGameSchema.extend({
  gameType: z.literal('hearts'),
});

const spadesGameSchema = baseStandardGameSchema.extend({
  gameType: z.literal('spades'),
});

const clubsGameSchema = baseStandardGameSchema.extend({
  gameType: z.literal('clubs'),
});

const grandGameSchema = baseStandardGameSchema.extend({
  gameType: z.literal('grand'),
});

const nullGameSchema = baseGameSchema.extend({
  gameType: z.literal('null'),
  playerIndex: z.number(),
  nullGame: z.union([
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
