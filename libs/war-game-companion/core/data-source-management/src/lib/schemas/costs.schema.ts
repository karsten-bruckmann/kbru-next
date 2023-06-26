import { z } from 'zod';

export const costsSchema = z
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
