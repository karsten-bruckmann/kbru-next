import { z } from 'zod';

import { booleanSchema } from './boolean.schema';
import { modifierGroupsSchema } from './modifier-groups.schema';
import { modifiersSchema } from './modifiers-schema';

export const profilesSchema = z
  .object({
    profile: z.array(
      z
        .object({
          characteristics: z.any(),
          '@_id': z.string(),
          '@_name': z.string(),
          '@_hidden': booleanSchema,
          '@_typeId': z.string(),
          '@_typeName': z.string(),
          '@_publicationId': z.string().optional(),
          '@_page': z.string().optional(),
          modifiers: modifiersSchema.optional(),
          modifierGroups: modifierGroupsSchema.optional(),
        })
        .strict()
    ),
  })
  .strict();
