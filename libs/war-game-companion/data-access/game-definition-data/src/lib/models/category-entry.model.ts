import { z } from 'zod';

import { categoryEntriesSchema } from '../schemas/category-entries.schema';
import { Constraint, getConstraints } from './constraint.model';
import { getInfoLinks, InfoLink } from './info-link.model';
import { getModifiers, Modifier } from './modifier.model';
import { getModifierGroups, ModifierGroup } from './modifier-group.model';

export interface CategoryEntry {
  __type: 'CategoryEntry';
  id: string;
  name: string;
  hidden: boolean;
  publicationId?: string;
  modifiers: Modifier[];
  modifierGroups: ModifierGroup[];
  constraints: Constraint[];
  infoLinks: InfoLink[];
  page?: string;
  comment?: string;
}

export const getCategoryEntries = (
  data?: z.infer<typeof categoryEntriesSchema>
): CategoryEntry[] => {
  return !data
    ? []
    : data.categoryEntry.map((ce) => ({
        __type: 'CategoryEntry',
        id: ce['@_id'],
        name: ce['@_name'],
        hidden: ce['@_hidden'] === 'true',
        publicationId: ce['@_publicationId'],
        modifiers: getModifiers(ce.modifiers),
        modifierGroups: getModifierGroups(ce.modifierGroups),
        constraints: getConstraints(ce.constraints),
        infoLinks: getInfoLinks(ce.infoLinks),
        page: ce['@_page'],
        comment: ce.comment,
      }));
};
