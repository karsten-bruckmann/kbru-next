import { z } from 'zod';

import { modifiersSchema } from '../schemas/modifiers-schema';
import { Condition, getConditions } from './condition.model';
import { ConditionGroup, getConditionGroups } from './condition-group.model';
import { getRepeats, Repeat } from './repeat.model';

export interface Modifier {
  type:
    | 'set'
    | 'increment'
    | 'decrement'
    | 'append'
    | 'add'
    | 'remove'
    | 'set-primary';
  field: 'hidden' | string;
  value: string;
  conditions: Condition[];
  repeats: Repeat[];
  conditionGroups: ConditionGroup[];
  comment?: string;
}

export const getModifiers = (
  data?: z.infer<typeof modifiersSchema>
): Modifier[] => {
  return !data
    ? []
    : data.modifier.map((m) => ({
        type: m['@_type'],
        field: m['@_field'],
        value: m['@_value'],
        conditions: getConditions(m.conditions),
        repeats: getRepeats(m.repeats),
        conditionGroups: getConditionGroups(m.conditionGroups),
        comment: m.comment,
      }));
};
