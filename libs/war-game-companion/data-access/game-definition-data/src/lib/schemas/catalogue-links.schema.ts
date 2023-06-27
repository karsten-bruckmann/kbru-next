import { z, ZodType } from 'zod';

import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface CatalogueLinksAware {
  catalogueLink: {
    '@_id': string;
    '@_name': string;
    '@_targetId': string;
    '@_type': 'catalogue';
    '@_importRootEntries': BooleanEnum;
  }[];
}

export const catalogueLinksSchema: ZodType<CatalogueLinksAware> = z
  .object({
    catalogueLink: z.array(
      z
        .object({
          '@_id': z.string(),
          '@_name': z.string(),
          '@_targetId': z.string(),
          '@_type': z.enum(['catalogue']),
          '@_importRootEntries': booleanSchema,
        })
        .strict()
    ),
  })
  .strict();
