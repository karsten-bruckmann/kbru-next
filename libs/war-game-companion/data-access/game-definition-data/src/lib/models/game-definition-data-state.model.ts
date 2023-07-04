import { Catalogue } from './catalogue.model';
import { GameSystem } from './game-system.model';

export interface GameDefinitionDataState {
  gameSystem: GameSystem;
  catalogue: Catalogue;
}
