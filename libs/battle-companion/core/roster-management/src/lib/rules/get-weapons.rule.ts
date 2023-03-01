import { Weapon } from '@kbru/battle-companion/data-access/rosters';

import {
  BsAbilityProfile,
  BsSelection,
  BsTypeName,
  BsWeaponProfile,
} from '../models/bs-roster.model';

export const getWeapons = (unit: BsSelection): Weapon[] => {
  return unit.selections
    .filter(
      (selection) =>
        selection.type === 'upgrade' &&
        selection.profiles.filter(
          (profile): profile is BsWeaponProfile =>
            profile.typeName === BsTypeName.WEAPON
        ).length > 0
    )
    .map((selection) => ({
      title: selection.customName || selection.name,
      amount: selection.number,
      abilities: selection.profiles
        .filter(
          (profile): profile is BsAbilityProfile =>
            profile.typeName === BsTypeName.ABILITY
        )
        .map((a) => a.description),
      profiles: selection.profiles
        .filter(
          (profile): profile is BsWeaponProfile =>
            profile.typeName === BsTypeName.WEAPON
        )
        .map((profile) => ({
          title: profile.name,
          range: profile.range,
          type: profile.type,
          strength: profile.strength,
          armourPenetration: profile.armourPenetration,
          damage: profile.damage,
          abilities: profile.abilities,
        })),
    }));
};
