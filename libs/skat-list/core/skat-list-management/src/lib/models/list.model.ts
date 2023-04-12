import { Player } from './player.model';

export interface List {
  id: string;
  summary: string;
  lastUpdate: Date;
  players: Player[];
}
