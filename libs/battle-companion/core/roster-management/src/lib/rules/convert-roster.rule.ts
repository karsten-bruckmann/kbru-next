import { uuid } from '@kbru/shared/utils/uuid';

import { BsRoster } from '../models/bs-roster.model';
import { Roster } from '../models/roster.model';
import { getDetachmentRules } from './get-detachment-rules.rule';
import { getUnitsRule } from './get-units.rule';

export const convertRoster = (bsRoster: BsRoster): Roster => {
  return {
    id: uuid(),
    title: bsRoster.name,
    detachments: bsRoster.forces.map((bsForce) => ({
      title: bsForce.name,
      units: getUnitsRule(bsForce),
      rules: getDetachmentRules(bsForce),
    })),
  };
};
