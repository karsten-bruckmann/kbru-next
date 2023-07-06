import { z } from 'zod';

import { catalogueSchema } from '../schemas/catalogue.schema';
import { CatalogueLink, getCatalogueLinks } from './catalogue-link.model';
import { CategoryEntry, getCategoryEntries } from './category-entry.model';
import { CostType, getCostTypes } from './cost-type.model';
import { EntryLink, getEntryLinks } from './entry-link.model';
import { ForceEntry, getForceEntries } from './force-entry.model';
import { getInfoGroups, InfoGroup } from './info-group.model';
import { getInfoLinks, InfoLink } from './info-link.model';
import { getProfiles, Profile } from './profile.model';
import { getProfileTypes, ProfileType } from './profile-type.model';
import { getPublications, Publication } from './publication.model';
import { getRules, Rule } from './rule.model';
import { getSelectionEntries, SelectionEntry } from './selection-entry.model';
import {
  getSelectionEntriyGroups,
  SelectionEntryGroup,
} from './selection-entry-group.model';

export interface Catalogue {
  __type: 'Catalogue';
  battleScribeVersion: string;
  id: string;
  name: string;
  revision: string;
  library: boolean;
  gameSystemId: string;
  gameSystemRevision: string;
  authorContact?: string;
  authorName?: string;
  authorUrl?: string;
  readme?: string;
  comment?: string;
  rules: Rule[];
  categoryEntries: CategoryEntry[];
  costTypes: CostType[];
  entryLinks: EntryLink[];
  publications: Publication[];
  profileTypes: ProfileType[];
  selectionEntries: SelectionEntry[];
  sharedSelectionEntries: SelectionEntry[];
  sharedSelectionEntryGroups: SelectionEntryGroup[];
  sharedRules: Rule[];
  sharedProfiles: Profile[];
  infoLinks: InfoLink[];
  forceEntries: ForceEntry[];
  sharedInfoGroups: InfoGroup[];
  catalogueLinks: CatalogueLink[];
  profiles: Profile[];
}

export const getCatalogue = (
  catalogue: z.infer<typeof catalogueSchema>
): Catalogue => {
  const c = catalogue.catalogue;
  return {
    __type: 'Catalogue',
    battleScribeVersion: c['@_battleScribeVersion'],
    id: c['@_id'],
    name: c['@_name'],
    revision: c['@_revision'],
    library: c['@_library'] === 'true',
    gameSystemId: c['@_gameSystemId'],
    gameSystemRevision: c['@_gameSystemRevision'],
    authorContact: c['@_authorContact'],
    authorName: c['@_authorName'],
    authorUrl: c['@_authorUrl'],
    readme: c.readme,
    comment: c.comment,
    rules: getRules(c.rules),
    categoryEntries: getCategoryEntries(c.categoryEntries),
    costTypes: getCostTypes(c.costTypes),
    entryLinks: getEntryLinks(c.entryLinks),
    publications: getPublications(c.publications),
    profileTypes: getProfileTypes(c.profileTypes),
    selectionEntries: getSelectionEntries(c.selectionEntries),
    sharedSelectionEntries: getSelectionEntries(c.sharedSelectionEntries),
    sharedSelectionEntryGroups: getSelectionEntriyGroups(
      c.sharedSelectionEntryGroups
    ),
    sharedRules: getRules(c.sharedRules),
    sharedProfiles: getProfiles(c.sharedProfiles),
    infoLinks: getInfoLinks(c.infoLinks),
    forceEntries: getForceEntries(c.forceEntries),
    sharedInfoGroups: getInfoGroups(c.sharedInfoGroups),
    catalogueLinks: getCatalogueLinks(c.catalogueLinks),
    profiles: getProfiles(c.profiles),
  };
};
