import { Model } from './model.model';
import { Rule } from './rule.model';

export interface Unit {
  title: string;
  keywords: string[];
  models: Model[];
  rules: Rule[];
  containsWarlord: boolean;
}
