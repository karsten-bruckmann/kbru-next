import { Rule } from '@kbru/battle-companion/data-access/rosters';

import {
  BsAbilityProfile,
  BsForce,
  BsSelection,
} from '../models/bs-roster.model';
import { getAbilityProfiles } from './get-ability-profiles.rule';

export const getUnitRules = (
  detachment: BsForce,
  unit: BsSelection
): Rule[] => {
  const mergedProfiles = (<BsAbilityProfile[]>[]).concat(
    getAbilityProfiles(detachment),
    getAbilityProfiles(unit)
  );

  return mergedProfiles
    .map((profile) => ({
      title: profile.name,
      description: profile.description,
    }))
    .concat(
      unit.rules.map((rule) => ({
        title: rule.name,
        description: rule.description,
      }))
    )
    .filter(
      (r, i, all) =>
        all.findIndex(
          (r2) => r.title === r2.title && r.description === r2.description
        ) === i
    );
};
