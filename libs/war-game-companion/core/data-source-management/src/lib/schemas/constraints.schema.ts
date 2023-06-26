import { z } from 'zod';

import { booleanSchema } from './boolean.schema';

export const constraintsSchema = z
  .object({
    constraint: z.array(
      z
        .object({
          '@_id': z.string(),
          '@_field': z.enum(['selections', 'forces']),
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
