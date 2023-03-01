import {
  BsAbilityProfile,
  BsForce,
  BsSelection,
  BsTypeName,
  BsWeaponProfile,
} from '../models/bs-roster.model';
import { isForce } from './is-force.rule';

export const getAbilityProfiles = (
  selection: BsSelection | BsForce
): BsAbilityProfile[] => {
  let profiles: BsAbilityProfile[] = [];

  selection.selections
    .filter(
      (s) =>
        s.type === 'upgrade' &&
        s.profiles.filter(
          (profile): profile is BsWeaponProfile =>
            profile.typeName === BsTypeName.WEAPON
        ).length === 0
    )
    .forEach(
      (subSelection) =>
        (profiles = getAbilityProfiles(subSelection).concat(profiles))
    );

  if (!isForce(selection)) {
    profiles = profiles.concat(
      selection.profiles.filter(
        (p): p is BsAbilityProfile => p.typeName === BsTypeName.ABILITY
      )
    );
  }

  return profiles;
};
