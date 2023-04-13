import { z } from 'zod';

import {
  clubsGameSchema,
  diamondsGameSchema,
  gameSchema,
  grandGameSchema,
  heartsGameSchema,
  nullGameSchema,
  spadesGameSchema,
} from '../schemas/game.schema';

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

export type NullGame = z.infer<typeof nullGameSchema>;
export type NullGameType = NullGame['nullGameType'];
