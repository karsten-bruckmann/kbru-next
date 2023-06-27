import { z, ZodType } from 'zod';

import {
  CharacteristicsAware,
  characteristicsSchema,
} from './characteristics.schema';
import {
  ModifierGroupsAware,
  modifierGroupsSchema,
} from './modifier-groups.schema';
import { ModifiersAware, modifiersSchema } from './modifiers-schema';
import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface ProfilesAware {
  profile: {
    '@_id': string;
    '@_name': string;
    '@_hidden': BooleanEnum;
    '@_typeId': string;
    '@_typeName': string;
    '@_publicationId'?: string;
    '@_page'?: string;
    characteristics?: CharacteristicsAware;
    modifiers?: ModifiersAware;
    modifierGroups?: ModifierGroupsAware;
  }[];
}

export const profilesSchema: ZodType<ProfilesAware> = z
  .object({
    profile: z.array(
      z
        .object({
          '@_id': z.string(),
          '@_name': z.string(),
          '@_hidden': booleanSchema,
          '@_typeId': z.string(),
          '@_typeName': z.string(),
          '@_publicationId': z.string().optional(),
          '@_page': z.string().optional(),
          characteristics: characteristicsSchema,
          modifiers: modifiersSchema.optional(),
          modifierGroups: modifierGroupsSchema.optional(),
        })
        .strict()
    ),
  })
  .strict();
