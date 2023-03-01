import { Profile } from '@kbru/battle-companion/data-access/rosters';

import {
  BsSelection,
  BsTypeName,
  BsUnitProfile,
} from '../models/bs-roster.model';

export const getProfiles = (unit: BsSelection): Profile[] => {
  return unit.profiles
    .filter(
      (profile): profile is BsUnitProfile =>
        profile.typeName === BsTypeName.UNIT
    )
    .map((profile) => ({
      title: profile.name,
      movement: profile.movement,
      weaponSkill: profile.weaponSkill,
      ballisticSkill: profile.ballisticSkill,
      strength: profile.strength,
      toughness: profile.toughness,
      wounds: profile.wounds,
      attacks: profile.attacks,
      leadership: profile.leadership,
      save: profile.save,
    }));
};
