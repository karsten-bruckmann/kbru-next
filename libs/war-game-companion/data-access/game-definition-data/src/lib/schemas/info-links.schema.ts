import { z } from 'zod';

import { booleanSchema } from './boolean.schema';
import { modifierGroupsSchema } from './modifier-groups.schema';
import { modifiersSchema } from './modifiers-schema';

export const infoLinksSchema = z
  .object({
    infoLink: z.array(
      z
        .object({
          '@_hidden': booleanSchema,
          '@_id': z.string(),
          '@_name': z.string().optional(),
          '@_targetId': z.string(),
          '@_type': z.enum(['profile', 'rule', 'infoGroup']),
          '@_publicationId': z.string().optional(),
          '@_page': z.string().optional(),
          comment: z.string().optional(),
          modifiers: modifiersSchema.optional(),
          modifierGroups: modifierGroupsSchema.optional(),
        })
        .strict()
    ),
  })
  .strict();
