import { ForceEntry } from '@kbru/war-game-companion/data-access/game-definition-data';
import { Roster } from '@kbru/war-game-companion/data-access/rosters';

import { DefinitionData } from '../models/definition-data.model';
import { HydratedRoster } from '../models/hydrated-roster.model';
import { findEntry } from './find-entry.rule';

export const hydrateRoster = (
  rawRoster: Roster,
  data: DefinitionData
): HydratedRoster => {
  return {
    ...rawRoster,
    forces: rawRoster.forces.map((rawForce) => ({
      ...rawForce,
      name: findEntry<ForceEntry>(rawForce.id, data)?.name || '__unknown__',
      selections: rawForce.selections.map((rawSelection) => ({
        ...rawSelection,
        name:
          findEntry<ForceEntry>(rawSelection.id, data)?.name || '__unknown__',
      })),
    })),
  };
};
