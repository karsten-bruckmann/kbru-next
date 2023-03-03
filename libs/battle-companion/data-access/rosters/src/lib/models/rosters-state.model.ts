import { Roster } from './roster.model';
import { Unit } from './unit.model';

export interface RostersState {
  rosters: Record<string, Roster>;
  units: Record<string, Unit>;
}
