import { z, ZodType } from 'zod';

export interface CharacteristicsAware {
  characteristic: {
    '#text'?: string | number;
    '@_name': string;
    '@_typeId': string;
  }[];
}

export const characteristicsSchema: ZodType<CharacteristicsAware> = z
  .object({
    characteristic: z.array(
      z
        .object({
          '#text': z.union([z.number(), z.string()]).optional(),
          '@_name': z.string(),
          '@_typeId': z.string(),
        })
        .strict()
    ),
  })
  .strict();
