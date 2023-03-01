import { Prayer } from '@kbru/battle-companion/data-access/rosters';

import {
  BsPrayerProfile,
  BsSelection,
  BsTypeName,
} from '../models/bs-roster.model';

export const getPrayers = (unit: BsSelection): Prayer[] => {
  return unit.selections
    .filter(
      (selection) =>
        selection.type === 'upgrade' &&
        selection.profiles.filter(
          (profile): profile is BsPrayerProfile =>
            profile.typeName === BsTypeName.PRAYERS
        ).length > 0
    )
    .map((selection) => ({
      title: selection.customName || selection.name,
      profiles: selection.profiles
        .filter(
          (profile): profile is BsPrayerProfile =>
            profile.typeName === BsTypeName.PRAYERS
        )
        .map((profile) => ({
          title: profile.name,
          effect: profile.effect,
        })),
    }));
};
