import { Rule } from '@kbru/battle-companion/data-access/rosters';
import { unique } from '@kbru/shared/utils/array-utils';

import { BsForce } from '../models/bs-roster.model';
import { getAbilityProfiles } from './get-ability-profiles.rule';

export const getDetachmentRules = (detachment: BsForce): Rule[] => {
  return unique(
    getAbilityProfiles(detachment)
      .map((profile) => ({
        title: profile.name,
        description: profile.description,
      }))
      .concat(
        detachment.rules.map((r) => ({
          title: r.name,
          description: r.description,
        }))
      ),
    (a, b) => a.title === b.title && a.description === b.description
  );
};
