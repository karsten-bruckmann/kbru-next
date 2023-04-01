import { Player } from './player.model';

export interface Group {
  id: string;
  name: string;
  players: Player[];
}
