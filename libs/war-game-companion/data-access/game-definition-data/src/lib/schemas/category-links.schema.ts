import { z, ZodType } from 'zod';

import { ConstraintsAware, constraintsSchema } from './constraints.schema';
import { ModifiersAware, modifiersSchema } from './modifiers-schema';
import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface CategoryLinksAware {
  categoryLink: {
    '@_hidden': BooleanEnum;
    '@_id': string;
    '@_primary': BooleanEnum;
    '@_targetId': string;
    '@_name'?: string;
    '@_publicationId'?: string;
    comment?: string;
    constraints?: ConstraintsAware;
    modifiers?: ModifiersAware;
  }[];
}

export const categoryLinksSchema: ZodType<CategoryLinksAware> = z
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
