import { Roster } from '@kbru/battle-companion/data-access/rosters';

import { BsRoster } from '../models/bs-roster.model';
import { getDetachmentRules } from './get-detachment-rules.rule';
import { getUnitsRule } from './get-units.rule';

export const convertRoster = (bsRoster: BsRoster): Roster => {
  return {
    title: bsRoster.name,
    detachments: bsRoster.forces.map((bsForce) => ({
      title: bsForce.name,
      units: getUnitsRule(bsForce),
      rules: getDetachmentRules(bsForce),
    })),
  };
};
