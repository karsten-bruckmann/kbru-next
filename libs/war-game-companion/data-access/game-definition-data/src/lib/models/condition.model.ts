import { z } from 'zod';

import { conditionsSchema } from '../schemas/conditions-schema';

export interface Condition {
  __type: 'Condition';
  field: 'selections' | 'forces' | string;
  scope:
    | 'roster'
    | 'force'
    | 'primary-catalogue'
    | 'parent'
    | 'ancestor'
    | string;
  value: string;
  percentValue: boolean;
  shared: boolean;
  includeChildSelections: boolean;
  includeChildForces: boolean;
  childId: string;
  type:
    | 'greaterThan'
    | 'lessThan'
    | 'notEqualTo'
    | 'atLeast'
    | 'equalTo'
    | 'instanceOf'
    | 'notInstanceOf'
    | 'atMost';
  comment?: string;
}

export const getConditions = (
  data?: z.infer<typeof conditionsSchema>
): Condition[] => {
  return !data
    ? []
    : data.condition.map((c) => ({
        __type: 'Condition',
        field: c['@_field'],
        scope: c['@_scope'],
        value: c['@_value'],
        percentValue: c['@_percentValue'] === 'true',
        shared: c['@_shared'] === 'true',
        includeChildSelections: c['@_includeChildSelections'] === 'true',
        includeChildForces: c['@_includeChildForces'] === 'true',
        childId: c['@_childId'],
        type: c['@_type'],
        comment: c.comment,
      }));
};
