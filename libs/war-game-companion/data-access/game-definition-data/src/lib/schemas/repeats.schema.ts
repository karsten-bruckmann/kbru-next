import { z, ZodType } from 'zod';

import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface RepeatsAware {
  repeat: {
    '@_field': 'selections';
    '@_scope': 'force' | 'roster' | string;
    '@_value': string;
    '@_percentValue': BooleanEnum;
    '@_shared': BooleanEnum;
    '@_includeChildSelections': BooleanEnum;
    '@_includeChildForces': BooleanEnum;
    '@_childId': string;
    '@_repeats': '1' | '2';
    '@_roundUp': BooleanEnum;
  }[];
}

export const repeatsSchema: ZodType<RepeatsAware> = z
  .object({
    repeat: z.array(
      z
        .object({
          '@_field': z.enum(['selections']),
          '@_scope': z.union([z.enum(['force', 'roster']), z.string()]),
          '@_value': z.string(),
          '@_percentValue': booleanSchema,
          '@_shared': booleanSchema,
          '@_includeChildSelections': booleanSchema,
          '@_includeChildForces': booleanSchema,
          '@_childId': z.string(),
          '@_repeats': z.enum(['1', '2']),
          '@_roundUp': booleanSchema,
        })
        .strict()
    ),
  })
  .strict();
