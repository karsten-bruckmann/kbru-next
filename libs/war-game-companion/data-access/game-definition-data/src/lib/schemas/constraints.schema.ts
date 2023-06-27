import { z, ZodType } from 'zod';

import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface ConstraintsAware {
  constraint: {
    '@_id': string;
    '@_field': 'selections' | 'forces' | string;
    '@_scope': 'roster' | 'force' | 'parent' | string;
    '@_value': string;
    '@_percentValue': BooleanEnum;
    '@_shared': BooleanEnum;
    '@_includeChildSelections': BooleanEnum;
    '@_includeChildForces': BooleanEnum;
    '@_type': 'max' | 'min';
  }[];
}

export const constraintsSchema: ZodType<ConstraintsAware> = z
  .object({
    constraint: z.array(
      z
        .object({
          '@_id': z.string(),
          '@_field': z.union([z.enum(['selections', 'forces']), z.string()]),
          '@_scope': z.union([
            z.enum(['roster', 'force', 'parent']),
            z.string(),
          ]),
          '@_value': z.string(),
          '@_percentValue': booleanSchema,
          '@_shared': booleanSchema,
          '@_includeChildSelections': booleanSchema,
          '@_includeChildForces': booleanSchema,
          '@_type': z.enum(['max', 'min']),
        })
        .strict()
    ),
  })
  .strict();
