import { uuid } from '@kbru/shared/utils/uuid';

import { BsCategory, BsForce } from '../models/bs-roster.model';
import { Unit } from '../models/unit.model';
import { getModels } from './get-models.rule';
import { getUnitRules } from './get-unit-rules.rule';

const primariesFirst = (a: BsCategory, b: BsCategory): 1 | 0 | -1 => {
  if (a.primary === b.primary) {
    return 0;
  }
  if (a.primary) {
    return -1;
  }
  return 1;
};

export const getUnitsRule = (detachment: BsForce): Unit[] => {
  return detachment.selections
    .filter((selection) => ['unit', 'model'].includes(selection.type))
    .map((selection) => {
      const models = getModels(selection);
      return {
        id: uuid(),
        title: selection.customName || selection.name,
        keywords: selection.categories.sort(primariesFirst).map((c) => c.name),
        models: models,
        rules: getUnitRules(detachment, selection),
        containsWarlord: !!models.find((model) => model.warlord),
      };
    });
};
