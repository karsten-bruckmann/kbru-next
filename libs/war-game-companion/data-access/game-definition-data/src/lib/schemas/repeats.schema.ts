import { z } from 'zod';

import { booleanSchema } from './boolean.schema';

export const repeatsSchema = z
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
