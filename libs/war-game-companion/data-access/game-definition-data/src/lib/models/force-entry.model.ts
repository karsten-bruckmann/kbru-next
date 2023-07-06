import { z } from 'zod';

import { forceEntriesSchema } from '../schemas/force-entries.schema';
import { CategoryLink, getCategoryLinks } from './category-link.model';
import { Constraint, getConstraints } from './constraint.model';
import { getModifiers, Modifier } from './modifier.model';
import { getRules, Rule } from './rule.model';

export interface ForceEntry {
  __type: 'ForceEntry';
  hidden: boolean;
  id: string;
  name: string;
  categoryLinks: CategoryLink[];
  modifiers: Modifier[];
  constraints: Constraint[];
  rules: Rule[];
  forceEntries: ForceEntry[];
}

export const getForceEntries = (
  data?: z.infer<typeof forceEntriesSchema>
): ForceEntry[] => {
  return !data
    ? []
    : data.forceEntry.map((fe) => ({
        __type: 'ForceEntry',
        hidden: fe['@_hidden'] === 'true',
        id: fe['@_id'],
        name: fe['@_name'],
        categoryLinks: getCategoryLinks(fe.categoryLinks),
        modifiers: getModifiers(fe.modifiers),
        constraints: getConstraints(fe.constraints),
        rules: getRules(fe.rules),
        forceEntries: getForceEntries(fe.forceEntries),
      }));
};
