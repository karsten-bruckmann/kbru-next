import { z, ZodType } from 'zod';

export interface CharacteristicTypesAware {
  characteristicType: {
    '@_id': string;
    '@_name': string;
  }[];
}

export const characteristicTypesSchema: ZodType<CharacteristicTypesAware> = z
  .object({
    characteristicType: z.array(
      z
        .object({
          '@_id': z.string(),
          '@_name': z.string(),
        })
        .strict()
    ),
  })
  .strict();
