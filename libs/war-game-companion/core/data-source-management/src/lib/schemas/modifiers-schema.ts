import { z } from 'zod';

import { conditionGroupsSchema } from './condition-groups.schema';
import { conditionsSchema } from './conditions-schema';
import { repeatsSchema } from './repeats.schema';

export const modifiersSchema = z
  .object({
    modifier: z.array(
      z
        .object({
          '@_type': z.enum([
            'set',
            'increment',
            'decrement',
            'append',
            'add',
            'remove',
            'set-primary',
          ]),
          '@_field': z.union([z.string(), z.literal('hidden')]),
          '@_value': z.string(),
          comment: z.string().optional(),
          conditions: conditionsSchema.optional(),
          repeats: repeatsSchema.optional(),
          conditionGroups: conditionGroupsSchema.optional(),
        })
        .strict()
    ),
  })
  .strict();
