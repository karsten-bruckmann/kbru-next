import { z } from 'zod';

import { modifierGroupsSchema } from '../schemas/modifier-groups.schema';
import { Condition, getConditions } from './condition.model';
import { ConditionGroup, getConditionGroups } from './condition-group.model';
import { getModifiers, Modifier } from './modifier.model';
import { getRepeats, Repeat } from './repeat.model';

export interface ModifierGroup {
  __type: 'ModifierGroup';
  conditions: Condition[];
  modifiers: Modifier[];
  conditionGroups: ConditionGroup[];
  repeats: Repeat[];
  modifierGroups: ModifierGroup[];
  comment?: string;
}

export const getModifierGroups = (
  data?: z.infer<typeof modifierGroupsSchema>
): ModifierGroup[] => {
  return !data
    ? []
    : data.modifierGroup.map((mg) => ({
        __type: 'ModifierGroup',
        conditions: getConditions(mg.conditions),
        conditionGroups: getConditionGroups(mg.conditionGroups),
        modifiers: getModifiers(mg.modifiers),
        repeats: getRepeats(mg.repeats),
        modifierGroups: getModifierGroups(mg.modifierGroups),
        comment: mg.comment,
      }));
};
