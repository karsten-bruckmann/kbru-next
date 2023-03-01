import { Mutation } from '@kbru/battle-companion/data-access/rosters';

import {
  BsMutatedBeyondReasonProfile,
  BsSelection,
  BsTypeName,
} from '../models/bs-roster.model';

export const getMutations = (
  unit: BsSelection,
  model?: BsSelection
): Mutation[] => {
  return unit.profiles
    .concat(model?.selections.map((s) => s.profiles).flat() || [])
    .filter(
      (profile): profile is BsMutatedBeyondReasonProfile =>
        profile.typeName === BsTypeName.MUTATED_BEYOND_REASON
    )
    .map((profile) => ({
      title: profile.name,
      effect: profile.effect,
    }));
};
