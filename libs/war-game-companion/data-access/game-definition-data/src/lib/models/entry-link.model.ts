import { z } from 'zod';

import { entryLinksSchema } from '../schemas/entry-links.schema';
import { CategoryLink, getCategoryLinks } from './category-links.model';
import { Constraint, getConstraints } from './constraint.model';
import { Cost, getCosts } from './cost.model';
import { getInfoGroups, InfoGroup } from './info-group.model';
import { getInfoLinks, InfoLink } from './info-link.model';
import { getModifiers, Modifier } from './modifier.model';
import { getModifierGroups, ModifierGroup } from './modifier-group.model';
import { getProfiles, Profile } from './profile.model';
import { getRules, Rule } from './rule.model';
import { getSelectionEntries, SelectionEntry } from './selection-entry.model';
import {
  getSelectionEntriyGroups,
  SelectionEntryGroup,
} from './selection-entry-group.model';

export interface EntryLink {
  hidden: boolean;
  id: string;
  name?: string;
  collective: boolean;
  import?: boolean;
  targetId: string;
  type: 'selectionEntry' | 'selectionEntryGroup';
  publicationId?: string;
  page?: string;
  comment?: string;
  categoryLinks: CategoryLink[];
  modifiers: Modifier[];
  modifierGroups: ModifierGroup[];
  constraints: Constraint[];
  costs: Cost[];
  profiles: Profile[];
  infoLinks: InfoLink[];
  infoGroups: InfoGroup[];
  selectionEntries: SelectionEntry[];
  selectionEntryGroups: SelectionEntryGroup[];
  rules: Rule[];
  entryLinks: EntryLink[];
}

export const getEntryLinks = (
  data?: z.infer<typeof entryLinksSchema>
): EntryLink[] => {
  return !data
    ? []
    : data.entryLink.map((el) => ({
        hidden: el['@_hidden'] === 'true',
        id: el['@_id'],
        name: el['@_name'],
        collective: el['@_collective'] === 'true',
        import: el['@_import'] === 'true',
        targetId: el['@_targetId'],
        type: el['@_type'],
        publicationId: el['@_publicationId'],
        page: el['@_page'],
        comment: el.comment,
        categoryLinks: getCategoryLinks(el.categoryLinks),
        modifiers: getModifiers(el.modifiers),
        modifierGroups: getModifierGroups(el.modifierGroups),
        constraints: getConstraints(el.constraints),
        costs: getCosts(el.costs),
        profiles: getProfiles(el.profiles),
        infoLinks: getInfoLinks(el.infoLinks),
        infoGroups: getInfoGroups(el.infoGroups),
        selectionEntries: getSelectionEntries(el.selectionEntries),
        selectionEntryGroups: getSelectionEntriyGroups(el.selectionEntryGroups),
        rules: getRules(el.rules),
        entryLinks: getEntryLinks(el.entryLinks),
      }));
};
