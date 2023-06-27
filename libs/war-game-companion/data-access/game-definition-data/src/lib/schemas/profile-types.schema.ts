import { z, ZodType } from 'zod';

import {
  CharacteristicTypesAware,
  characteristicTypesSchema,
} from './characteristic-types.schema';

export interface ProfileTypesAware {
  profileType: {
    '@_id': string;
    '@_name': string;
    characteristicTypes?: CharacteristicTypesAware;
  }[];
}

export const profileTypesSchema: ZodType<ProfileTypesAware> = z
  .object({
    profileType: z.array(
      z.object({
        '@_id': z.string(),
        '@_name': z.string(),
        characteristicTypes: characteristicTypesSchema.optional(),
      })
    ),
  })
  .strict();
