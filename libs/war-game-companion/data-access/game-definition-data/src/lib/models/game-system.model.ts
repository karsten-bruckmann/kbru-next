import { z } from 'zod';

import { gameSystemSchema } from '../schemas/game-system.schema';
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

export interface GameSystem {
  __type: 'GameSystem';
  authorContact: string;
  authorName: string;
  authorUrl?: string;
  battleScribeVersion: string;
  id: string;
  name: string;
  revision: string;
  readme?: string;
  categoryEntries: CategoryEntry[];
  costTypes: CostType[];
  entryLinks: EntryLink[];
  forceEntries: ForceEntry[];
  publications: Publication[];
  profileTypes: ProfileType[];
  sharedSelectionEntries: SelectionEntry[];
  sharedSelectionEntryGroups: SelectionEntryGroup[];
  sharedRules: Rule[];
  sharedProfiles: Profile[];
  selectionEntries: SelectionEntry[];
  sharedInfoGroups: InfoGroup[];
  profiles: Profile[];
  rules: Rule[];
  infoLinks: InfoLink[];
}

export const getGameSystem = (
  gameSystem: z.infer<typeof gameSystemSchema>
): GameSystem => {
  const gs = gameSystem.gameSystem;
  return {
    __type: 'GameSystem',
    battleScribeVersion: gs['@_battleScribeVersion'],
    id: gs['@_id'],
    name: gs['@_name'],
    revision: gs['@_revision'],
    authorContact: gs['@_authorContact'],
    authorName: gs['@_authorName'],
    authorUrl: gs['@_authorUrl'],
    readme: gs.readme,
    rules: getRules(gs.rules),
    categoryEntries: getCategoryEntries(gs.categoryEntries),
    costTypes: getCostTypes(gs.costTypes),
    entryLinks: getEntryLinks(gs.entryLinks),
    publications: getPublications(gs.publications),
    profileTypes: getProfileTypes(gs.profileTypes),
    selectionEntries: getSelectionEntries(gs.selectionEntries),
    sharedSelectionEntryGroups: getSelectionEntriyGroups(
      gs.sharedSelectionEntryGroups
    ),
    sharedRules: getRules(gs.sharedRules),
    sharedProfiles: getProfiles(gs.sharedProfiles),
    infoLinks: getInfoLinks(gs.infoLinks),
    forceEntries: getForceEntries(gs.forceEntries),
    sharedInfoGroups: getInfoGroups(gs.sharedInfoGroups),
    profiles: getProfiles(gs.profiles),
    sharedSelectionEntries: getSelectionEntries(gs.sharedSelectionEntries),
  };
};
