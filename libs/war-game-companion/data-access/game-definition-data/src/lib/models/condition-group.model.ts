import { z } from 'zod';

import { conditionGroupsSchema } from '../schemas/condition-groups.schema';
import { Condition, getConditions } from './condition.model';

export interface ConditionGroup {
  type: 'or' | 'and';
  comment?: string;
  conditions: Condition[];
  conditionGroups: ConditionGroup[];
}

export const getConditionGroups = (
  data?: z.infer<typeof conditionGroupsSchema>
): ConditionGroup[] => {
  return !data
    ? []
    : data.conditionGroup.map((cg) => ({
        type: cg['@_type'],
        comment: cg.comment,
        conditions: getConditions(cg.conditions),
        conditionGroups: getConditionGroups(cg.conditionGroups),
      }));
};
