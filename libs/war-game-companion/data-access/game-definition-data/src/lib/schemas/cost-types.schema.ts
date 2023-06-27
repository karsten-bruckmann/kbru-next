import { z } from 'zod';

import { booleanSchema } from './boolean.schema';

export const costTypesSchema = z
  .object({
    costType: z.array(
      z
        .object({
          '@_hidden': booleanSchema,
          '@_id': z.string(),
          '@_name': z.string(),
          '@_defaultCostLimit': z.string(),
        })
        .strict()
    ),
  })
  .strict();
