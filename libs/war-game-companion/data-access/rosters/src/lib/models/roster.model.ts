import { Force } from './force.model';

export interface Roster {
  id: string;
  name: string;
  gameSystemId: string;
  forces: Force[];
}
