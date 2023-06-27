import { z, ZodType } from 'zod';

import {
  DataIndexEntriesAware,
  dataIndexEntriesSchema,
} from './data-index-entries.schema';

export interface CatalogueIndex {
  '?xml': unknown;
  dataIndex: {
    '@_battleScribeVersion': string;
    '@_indexUrl': string;
    '@_name': string;
    '@_xmlns': string;
    repositoryUrls: string;
    dataIndexEntries: DataIndexEntriesAware;
  };
}

export const catalogueIndexSchema: ZodType<CatalogueIndex> = z
  .object({
    '?xml': z.object({}),
    dataIndex: z.object({
      '@_battleScribeVersion': z.string(),
      '@_indexUrl': z.string().url(),
      '@_name': z.string(),
      '@_xmlns': z.string(),
      repositoryUrls: z.string(),
      dataIndexEntries: dataIndexEntriesSchema,
    }),
  })
  .strict();
