import { Game } from './game.model';
import { Player } from './player.model';
import { Status } from './status.model';

export interface List {
  id: string;
  description: string;
  players: Player[];
  games: Game[];
  status: Status;
}
