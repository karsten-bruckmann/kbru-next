import {
  catalogueSelector,
  gameSystemSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { DefinitionData } from '../models/definition-data.model';

export const definitionDataSelector = createSelector(
  gameSystemSelector,
  catalogueSelector,
  (gameSystem, catalogue): DefinitionData | null => {
    if (!gameSystem || !catalogue) {
      return null;
    }

    return {
      gameSystem: {
        id: gameSystem.id,
        name: gameSystem.name,
      },
      catalogue: {
        id: catalogue.id,
        name: catalogue.name,
      },

      categoryEntries: [
        ...gameSystem.categoryEntries,
        ...catalogue.categoryEntries,
      ],
      costTypes: [...gameSystem.costTypes, ...catalogue.costTypes],
      forceEntries: [...gameSystem.forceEntries, ...catalogue.forceEntries],
      profileTypes: [...gameSystem.profileTypes, ...catalogue.profileTypes],
      publications: [...gameSystem.publications, ...catalogue.publications],
      sharedSelectionEntries: [
        ...gameSystem.sharedSelectionEntries,
        ...catalogue.sharedSelectionEntries,
      ],
      catalogueLinks: [...catalogue.catalogueLinks],
      entryLinks: [...gameSystem.entryLinks, ...catalogue.entryLinks],
      infoLinks: [...gameSystem.infoLinks, ...catalogue.infoLinks],
      profiles: [...gameSystem.profiles, ...catalogue.profiles],
      rules: [...gameSystem.rules, ...catalogue.rules],
      selectionEntries: [
        ...gameSystem.selectionEntries,
        ...catalogue.selectionEntries,
      ],
      sharedInfoGroups: [
        ...gameSystem.sharedInfoGroups,
        ...catalogue.sharedInfoGroups,
      ],
      sharedProfiles: [
        ...gameSystem.sharedProfiles,
        ...catalogue.sharedProfiles,
      ],
      sharedRules: [...gameSystem.sharedRules, ...catalogue.sharedRules],
      sharedSelectionEntryGroups: [
        ...gameSystem.sharedSelectionEntryGroups,
        ...catalogue.sharedSelectionEntryGroups,
      ],
    };
  }
);
