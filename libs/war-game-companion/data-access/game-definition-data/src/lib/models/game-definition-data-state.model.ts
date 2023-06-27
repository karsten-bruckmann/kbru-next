import { Catalogue } from '../schemas/catalogue.schema';
import { GameSystem } from '../schemas/game-system.schema';

export interface GameDefinitionDataState {
  gameSystems: Record<string, GameSystem['gameSystem']>;
  catalogues: Record<string, Catalogue['catalogue']>;
}
