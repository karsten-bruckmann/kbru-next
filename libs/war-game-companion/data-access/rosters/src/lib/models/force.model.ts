import { SelectionReference } from './selection-reference.model';

export interface Force {
  id: string;
  selections: SelectionReference[];
}
