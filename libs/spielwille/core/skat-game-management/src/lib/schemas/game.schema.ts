import { z } from 'zod';

const baseGameSchema = z.object({
  id: z.string(),
});

const baseStandardGameSchema = baseGameSchema.extend({
  playerIndex: z.number(),
  spitzen: z.number(),
  threshold: z.nullable(
    z.union([z.literal('schneider'), z.literal('schwarz')])
  ),
  thresholdAnnounced: z.nullable(
    z.union([z.literal('schneider'), z.literal('schwarz')])
  ),
  spritze: z.nullable(
    z.union([
      z.null(),
      z.literal('kontra'),
      z.literal('re'),
      z.literal('hirsch'),
    ])
  ),
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
  nullGameType: z.union([
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
