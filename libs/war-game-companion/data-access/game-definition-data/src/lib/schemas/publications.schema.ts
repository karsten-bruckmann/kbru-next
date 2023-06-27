import { z } from 'zod';

export const publicationsSchema = z
  .object({
    publication: z.array(
      z
        .object({
          '@_id': z.string(),
          '@_name': z.string(),
          '@_shortName': z.string().optional(),
          '@_publisher': z.string().optional(),
          '@_publicationDate': z.string().optional(),
          '@_publisherUrl': z.string().optional(),
        })
        .strict()
    ),
  })
  .strict();
