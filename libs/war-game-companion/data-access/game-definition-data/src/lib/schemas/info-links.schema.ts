import { z, ZodType } from 'zod';

import {
  ModifierGroupsAware,
  modifierGroupsSchema,
} from './modifier-groups.schema';
import { ModifiersAware, modifiersSchema } from './modifiers-schema';
import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface InfoLinksAware {
  infoLink: {
    '@_hidden': BooleanEnum;
    '@_id': string;
    '@_name'?: string;
    '@_targetId': string;
    '@_type': 'profile' | 'rule' | 'infoGroup';
    '@_publicationId'?: string;
    '@_page'?: string;
    comment?: string;
    modifiers?: ModifiersAware;
    modifierGroups?: ModifierGroupsAware;
  }[];
}

export const infoLinksSchema: ZodType<InfoLinksAware> = z
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
