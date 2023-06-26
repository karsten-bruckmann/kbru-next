import { z } from 'zod';

export const profileTypesSchema = z
  .object({
    profileType: z.array(
      z.object({
        '@_id': z.string(),
        '@_name': z.string(),
        characteristicTypes: z
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
          .strict(),
      })
    ),
  })
  .strict();
