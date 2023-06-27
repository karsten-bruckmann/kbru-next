import { z, ZodType } from 'zod';

export interface PublicationsAware {
  publication: {
    '@_id': string;
    '@_name': string;
    '@_shortName'?: string;
    '@_publisher'?: string;
    '@_publicationDate'?: string;
    '@_publisherUrl'?: string;
    comment?: string;
  }[];
}

export const publicationsSchema: ZodType<PublicationsAware> = z
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
          comment: z.string().optional(),
        })
        .strict()
    ),
  })
  .strict();
