import { z, ZodType } from 'zod';

import {
  ModifierGroupsAware,
  modifierGroupsSchema,
} from './modifier-groups.schema';
import { ModifiersAware, modifiersSchema } from './modifiers-schema';
import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface RulesAware {
  rule: {
    '@_hidden'?: BooleanEnum;
    '@_id': string;
    '@_name': string;
    '@_publicationId'?: string;
    '@_page'?: string;
    comment?: string;
    description?: string;
    modifiers?: ModifiersAware;
    modifierGroups?: ModifierGroupsAware;
  }[];
}

export const rulesSchema: ZodType<RulesAware> = z
  .object({
    rule: z.array(
      z
        .object({
          '@_hidden': booleanSchema.optional(),
          '@_id': z.string(),
          '@_name': z.string(),
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
