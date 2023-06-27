import { z, ZodType } from 'zod';

export interface CostsAware {
  cost: {
    '@_name': string;
    '@_typeId': string;
    '@_value': string;
  }[];
}

export const costsSchema: ZodType<CostsAware> = z
  .object({
    cost: z.array(
      z
        .object({
          '@_name': z.string(),
          '@_typeId': z.string(),
          '@_value': z.string(),
        })
        .strict()
    ),
  })
  .strict();
