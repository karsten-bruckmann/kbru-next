import { Rule } from './rule.model';

export interface Detachment {
  title: string;
  units: string[];
  rules: Rule[];
}
