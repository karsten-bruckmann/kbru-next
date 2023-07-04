import {
  Catalogue,
  catalogueSelector,
  GameSystem,
  gameSystemSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

export const definitionDataSelector = createSelector(
  gameSystemSelector,
  catalogueSelector,
  (
    gameSystem,
    catalogue
  ): Omit<
    GameSystem,
    | '@_authorContact'
    | '@_authorName'
    | '@_authorUrl'
    | '@_battleScribeVersion'
    | '@_id'
    | '@_name'
    | '@_revision'
    | '@_xmlns'
    | 'readme'
  > &
    Omit<
      Catalogue,
      | '@_authorContact'
      | '@_authorName'
      | '@_authorUrl'
      | '@_battleScribeVersion'
      | '@_id'
      | '@_name'
      | '@_revision'
      | '@_xmlns'
      | '@_library'
      | '@_gameSystemId'
      | '@_gameSystemRevision'
      | 'readme'
      | 'comment'
    > => ({
    categoryEntries: {
      categoryEntry: [
        ...(gameSystem?.categoryEntries.categoryEntry || []),
        ...(catalogue?.categoryEntries?.categoryEntry || []),
      ],
    },
    costTypes: {
      costType: [
        ...(gameSystem?.costTypes.costType || []),
        ...(catalogue?.costTypes?.costType || []),
      ],
    },
    forceEntries: {
      forceEntry: [
        ...(gameSystem?.forceEntries.forceEntry || []),
        ...(catalogue?.forceEntries?.forceEntry || []),
      ],
    },
    profileTypes: {
      profileType: [
        ...(gameSystem?.profileTypes.profileType || []),
        ...(catalogue?.profileTypes?.profileType || []),
      ],
    },
    publications: {
      publication: [
        ...(gameSystem?.publications.publication || []),
        ...(catalogue?.publications?.publication || []),
      ],
    },
    sharedSelectionEntries: {
      selectionEntry: [
        ...(gameSystem?.sharedSelectionEntries.selectionEntry || []),
        ...(catalogue?.sharedSelectionEntries?.selectionEntry || []),
      ],
    },
    catalogueLinks: {
      catalogueLink: [...(catalogue?.catalogueLinks?.catalogueLink || [])],
    },
    entryLinks: {
      entryLink: [
        ...(gameSystem?.entryLinks?.entryLink || []),
        ...(catalogue?.entryLinks?.entryLink || []),
      ],
    },
    infoLinks: {
      infoLink: [
        ...(gameSystem?.infoLinks?.infoLink || []),
        ...(catalogue?.infoLinks?.infoLink || []),
      ],
    },
    profiles: {
      profile: [
        ...(gameSystem?.profiles?.profile || []),
        ...(catalogue?.profiles?.profile || []),
      ],
    },
    rules: {
      rule: [
        ...(gameSystem?.rules?.rule || []),
        ...(catalogue?.rules?.rule || []),
      ],
    },
    selectionEntries: {
      selectionEntry: [
        ...(gameSystem?.selectionEntries?.selectionEntry || []),
        ...(catalogue?.selectionEntries?.selectionEntry || []),
      ],
    },
    sharedInfoGroups: {
      infoGroup: [
        ...(gameSystem?.sharedInfoGroups?.infoGroup || []),
        ...(catalogue?.sharedInfoGroups?.infoGroup || []),
      ],
    },
    sharedProfiles: {
      profile: [
        ...(gameSystem?.sharedProfiles?.profile || []),
        ...(catalogue?.sharedProfiles?.profile || []),
      ],
    },
    sharedRules: {
      rule: [
        ...(gameSystem?.sharedRules?.rule || []),
        ...(catalogue?.sharedRules?.rule || []),
      ],
    },
    sharedSelectionEntryGroups: {
      selectionEntryGroup: [
        ...(gameSystem?.sharedSelectionEntryGroups?.selectionEntryGroup || []),
        ...(catalogue?.sharedSelectionEntryGroups?.selectionEntryGroup || []),
      ],
    },
  })
);
