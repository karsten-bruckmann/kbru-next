import { z } from 'zod';

import { booleanSchema } from './boolean.schema';
import { constraintsSchema } from './constraints.schema';
import { infoLinksSchema } from './info-links.schema';
import { modifierGroupsSchema } from './modifier-groups.schema';
import { modifiersSchema } from './modifiers-schema';

export const categoryEntriesSchema = z
  .object({
    categoryEntry: z.array(
      z
        .object({
          '@_hidden': booleanSchema,
          '@_id': z.string(),
          '@_name': z.string(),
          '@_publicationId': z.string().optional(),
          '@_page': z.string().optional(),
          comment: z.string().optional(),
          modifiers: modifiersSchema.optional(),
          modifierGroups: modifierGroupsSchema.optional(),
          constraints: constraintsSchema.optional(),
          infoLinks: infoLinksSchema.optional(),
        })
        .strict()
    ),
  })
  .strict();
