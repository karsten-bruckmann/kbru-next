import { PsychicPower } from '@kbru/battle-companion/data-access/rosters';

import {
  BsPsychicPowerProfile,
  BsSelection,
  BsTypeName,
} from '../models/bs-roster.model';

export const getPsychicPowers = (unit: BsSelection): PsychicPower[] => {
  return unit.selections
    .filter(
      (selection) =>
        selection.type === 'upgrade' &&
        selection.profiles.filter(
          (profile): profile is BsPsychicPowerProfile =>
            profile.typeName === BsTypeName.PSYCHIC_POWER
        ).length > 0
    )
    .map((selection) => ({
      title: selection.customName || selection.name,
      profiles: selection.profiles
        .filter(
          (profile): profile is BsPsychicPowerProfile =>
            profile.typeName === BsTypeName.PSYCHIC_POWER
        )
        .map((profile) => ({
          title: profile.name,
          range: profile.range,
          warpCharge: profile.warpCharge,
          description: profile.details,
        })),
    }));
};
