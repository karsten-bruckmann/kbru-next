import { Detachment } from './detachment.model';

export interface Roster {
  title: string;
  roszUrl?: string;
  detachments: Detachment[];
}
