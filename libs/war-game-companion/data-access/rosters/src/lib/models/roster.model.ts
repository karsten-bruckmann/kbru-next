import { Force } from './force.model';

export interface Roster {
  id: string;
  name: string;
  catalogueId: string;
  forces: Force[];
}
