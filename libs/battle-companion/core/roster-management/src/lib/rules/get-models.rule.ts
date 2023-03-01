import { Model } from '@kbru/battle-companion/data-access/rosters';

import { BsSelection } from '../models/bs-roster.model';
import { deduplicateModels } from './deduplicate-models.rule';
import { getMutations } from './get-mutations.rule';
import { getPrayers } from './get-prayers.rule';
import { getProfiles } from './get-profiles.rule';
import { getPsychicPowers } from './get-psychic-powers.rule';
import { getWeapons } from './get-weapons.rule';
import { isWarlord } from './is-warlord.rule';

export const getModels = (unit: BsSelection): Model[] => {
  if (unit.type === 'model') {
    return [
      {
        title: unit.customName || unit.name,
        warlord: isWarlord(unit),
        amount: 1,
        profiles: getProfiles(unit),
        weapons: getWeapons(unit),
        psychicPowers: getPsychicPowers(unit),
        prayers: getPrayers(unit),
        mutations: getMutations(unit),
      },
    ];
  }

  const unitProfiles = getProfiles(unit);

  const models = unit.profiles
    .filter((profile) => ['Unit'].includes(profile.typeName))
    .map((profile) => {
      return {
        title: profile.name,
        warlord: isWarlord(unit),
        amount: 1,
        profiles: getProfiles(unit),
        weapons: getWeapons(unit),
        psychicPowers: getPsychicPowers(unit),
        prayers: getPrayers(unit),
        mutations: getMutations(unit),
      };
    })
    .concat(
      unit.selections
        .filter((selection) => ['unit', 'model'].includes(selection.type))
        .map((selection) => {
          const modelProfiles = getProfiles(selection);
          const profiles =
            modelProfiles.length > 0 ? modelProfiles : unitProfiles;
          return {
            title: selection.customName || selection.name,
            warlord: isWarlord(selection),
            amount: selection.number,
            profiles: profiles,
            weapons: getWeapons(selection),
            psychicPowers: getPsychicPowers(selection),
            prayers: getPrayers(selection),
            mutations: getMutations(unit, selection),
          };
        })
    );

  return deduplicateModels(models);
};
