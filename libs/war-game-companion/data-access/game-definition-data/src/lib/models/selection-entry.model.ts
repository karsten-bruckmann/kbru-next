import { z } from 'zod';

import { selectionEntriesSchema } from '../schemas/selection-entries.schema';
import { CategoryLink, getCategoryLinks } from './category-link.model';
import { Constraint, getConstraints } from './constraint.model';
import { Cost, getCosts } from './cost.model';
import { EntryLink, getEntryLinks } from './entry-link.model';
import { getInfoGroups, InfoGroup } from './info-group.model';
import { getInfoLinks, InfoLink } from './info-link.model';
import { getModifiers, Modifier } from './modifier.model';
import { getModifierGroups, ModifierGroup } from './modifier-group.model';
import { getProfiles, Profile } from './profile.model';
import { getRules, Rule } from './rule.model';
import {
  getSelectionEntriyGroups,
  SelectionEntryGroup,
} from './selection-entry-group.model';

export interface SelectionEntry {
  __type: 'SelectionEntry';
  id: string;
  name: string;
  hidden: boolean;
  collective: boolean;
  import: boolean;
  type: 'upgrade' | 'model' | 'unit';
  publicationId?: string;
  page?: string;
  comment?: string;
  infoLinks: InfoLink[];
  modifiers: Modifier[];
  constraints: Constraint[];
  categoryLinks: CategoryLink[];
  rules: Rule[];
  costs: Cost[];
  profiles: Profile[];
  modifierGroups: ModifierGroup[];
  infoGroups: InfoGroup[];
  selectionEntries: SelectionEntry[];
  selectionEntryGroups: SelectionEntryGroup[];
  entryLinks: EntryLink[];
}

export const getSelectionEntries = (
  data?: z.infer<typeof selectionEntriesSchema>
): SelectionEntry[] => {
  return !data
    ? []
    : data.selectionEntry.map(
        (se): SelectionEntry => ({
          __type: 'SelectionEntry',
          id: se['@_id'],
          name: se['@_name'],
          hidden: se['@_hidden'] === 'true',
          collective: se['@_collective'] === 'true',
          import: se['@_import'] === 'true',
          type: se['@_type'],
          publicationId: se['@_publicationId'],
          page: se['@_page'],
          comment: se.comment,
          infoLinks: getInfoLinks(se.infoLinks),
          modifiers: getModifiers(se.modifiers),
          modifierGroups: getModifierGroups(se.modifierGroups),
          constraints: getConstraints(se.constraints),
          categoryLinks: getCategoryLinks(se.categoryLinks),
          rules: getRules(se.rules),
          costs: getCosts(se.costs),
          profiles: getProfiles(se.profiles),
          infoGroups: getInfoGroups(se.infoGroups),
          selectionEntries: getSelectionEntries(se.selectionEntries),
          selectionEntryGroups: getSelectionEntriyGroups(
            se.selectionEntryGroups
          ),
          entryLinks: getEntryLinks(se.entryLinks),
        })
      );
};
