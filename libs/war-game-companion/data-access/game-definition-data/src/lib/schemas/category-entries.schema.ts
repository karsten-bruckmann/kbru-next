import { z, ZodType } from 'zod';

import { ConstraintsAware, constraintsSchema } from './constraints.schema';
import { InfoLinksAware, infoLinksSchema } from './info-links.schema';
import {
  ModifierGroupsAware,
  modifierGroupsSchema,
} from './modifier-groups.schema';
import { ModifiersAware, modifiersSchema } from './modifiers-schema';
import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface CategoryEntriesAware {
  categoryEntry: {
    '@_hidden': BooleanEnum;
    '@_id': string;
    '@_name': string;
    '@_publicationId'?: string;
    '@_page'?: string;
    comment?: string;
    modifiers?: ModifiersAware;
    modifierGroups?: ModifierGroupsAware;
    constraints?: ConstraintsAware;
    infoLinks?: InfoLinksAware;
  }[];
}

export const categoryEntriesSchema: ZodType<CategoryEntriesAware> = z
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
