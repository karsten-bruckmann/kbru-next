import { z } from 'zod';

import { constraintsSchema } from '../schemas/constraints.schema';

export interface Constraint {
  __type: 'Constraint';
  id: string;
  field: 'selections' | 'forces' | string;
  scope: 'roster' | 'force' | 'parent' | string;
  value: string;
  percentValue: boolean;
  shared: boolean;
  includeChildSelections: boolean;
  includeChildForces: boolean;
  type: 'max' | 'min';
}

export const getConstraints = (
  data?: z.infer<typeof constraintsSchema>
): Constraint[] => {
  return !data
    ? []
    : data.constraint.map((c) => ({
        __type: 'Constraint',
        id: c['@_id'],
        field: c['@_field'],
        scope: c['@_scope'],
        value: c['@_value'],
        percentValue: c['@_percentValue'] === 'true',
        shared: c['@_shared'] === 'true',
        includeChildSelections: c['@_includeChildSelections'] === 'true',
        includeChildForces: c['@_includeChildForces'] === 'true',
        type: c['@_type'],
      }));
};
