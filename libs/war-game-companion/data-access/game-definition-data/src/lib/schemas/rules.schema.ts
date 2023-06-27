import { z } from 'zod';

import { booleanSchema } from './boolean.schema';
import { modifierGroupsSchema } from './modifier-groups.schema';
import { modifiersSchema } from './modifiers-schema';

export const rulesSchema = z
  .object({
    rule: z.array(
      z
        .object({
          '@_hidden': booleanSchema.optional(),
          '@_id': z.string().optional(),
          '@_name': z.string().optional(),
          '@_publicationId': z.string().optional(),
          '@_page': z.string().optional(),
          comment: z.string().optional(),
          description: z.string().optional(),
          modifiers: modifiersSchema.optional(),
          modifierGroups: modifierGroupsSchema.optional(),
        })
        .strict()
    ),
  })
  .strict();
