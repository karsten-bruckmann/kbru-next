import { z } from 'zod';

import { booleanSchema } from './boolean.schema';
import { constraintsSchema } from './constraints.schema';
import { modifiersSchema } from './modifiers-schema';

export const categoryLinksSchema = z
  .object({
    categoryLink: z.array(
      z
        .object({
          '@_hidden': booleanSchema,
          '@_id': z.string(),
          '@_primary': booleanSchema,
          '@_targetId': z.string(),
          '@_name': z.string().optional(),
          '@_publicationId': z.string().optional(),
          comment: z.string().optional(),
          constraints: constraintsSchema.optional(),
          modifiers: modifiersSchema.optional(),
        })
        .strict()
    ),
  })
  .strict();
