import { z } from 'zod';

import { selectionEntryGroupsSchema } from '../schemas/selection-entry-groups.schema';
import { CategoryLink, getCategoryLinks } from './category-links.model';
import { Constraint, getConstraints } from './constraint.model';
import { EntryLink, getEntryLinks } from './entry-link.model';
import { getInfoLinks, InfoLink } from './info-link.model';
import { getModifiers, Modifier } from './modifier.model';
import { getModifierGroups, ModifierGroup } from './modifier-group.model';
import { getProfiles, Profile } from './profile.model';
import { getSelectionEntries, SelectionEntry } from './selection-entry.model';

export interface SelectionEntryGroup {
  id: string;
  name: string;
  hidden: boolean;
  collective: boolean;
  import: boolean;
  defaultSelectionEntryId?: string;
  publicationId?: string;
  page?: string;
  comment?: string;
  modifiers: Modifier[];
  constraints: Constraint[];
  modifierGroups: ModifierGroup[];
  profiles: Profile[];
  categoryLinks: CategoryLink[];
  infoLinks: InfoLink[];
  selectionEntryGroups: SelectionEntryGroup[];
  selectionEntries: SelectionEntry[];
  entryLinks: EntryLink[];
}

export const getSelectionEntriyGroups = (
  data?: z.infer<typeof selectionEntryGroupsSchema>
): SelectionEntryGroup[] => {
  return !data
    ? []
    : data.selectionEntryGroup.map(
        (seg): SelectionEntryGroup => ({
          id: seg['@_id'],
          name: seg['@_name'],
          hidden: seg['@_hidden'] === 'true',
          collective: seg['@_collective'] === 'true',
          import: seg['@_import'] === 'true',
          publicationId: seg['@_publicationId'],
          page: seg['@_page'],
          comment: seg.comment,
          infoLinks: getInfoLinks(seg.infoLinks),
          modifiers: getModifiers(seg.modifiers),
          modifierGroups: getModifierGroups(seg.modifierGroups),
          constraints: getConstraints(seg.constraints),
          categoryLinks: getCategoryLinks(seg.categoryLinks),
          profiles: getProfiles(seg.profiles),
          entryLinks: getEntryLinks(seg.entryLinks),
          selectionEntries: getSelectionEntries(seg.selectionEntries),
          selectionEntryGroups: getSelectionEntriyGroups(
            seg.selectionEntryGroups
          ),
        })
      );
};
