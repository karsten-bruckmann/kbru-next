import { z } from 'zod';

import { repeatsSchema } from '../schemas/repeats.schema';

export interface Repeat {
  field: 'selections' | string;
  scope: 'force' | 'roster' | string;
  value: string;
  percentValue: boolean;
  shared: boolean;
  includeChildSelections: boolean;
  includeChildForces: boolean;
  childId: string;
  repeats: number;
  roundUp: boolean;
}

export const getRepeats = (data?: z.infer<typeof repeatsSchema>): Repeat[] => {
  return !data
    ? []
    : data.repeat.map((r) => ({
        field: r['@_field'],
        scope: r['@_scope'],
        value: r['@_value'],
        percentValue: r['@_percentValue'] === 'true',
        shared: r['@_shared'] === 'true',
        includeChildSelections: r['@_includeChildSelections'] === 'true',
        includeChildForces: r['@_includeChildForces'] === 'true',
        childId: r['@_childId'],
        repeats: parseInt(r['@_repeats']),
        roundUp: r['@_roundUp'] === 'true',
      }));
};
