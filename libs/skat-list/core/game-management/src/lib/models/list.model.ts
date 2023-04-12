import { Game } from './game.model';
import { Player } from './player.model';

export interface List {
  id: string;
  description: string;
  players: Player[];
  games: Game[];
}
