import { z } from 'zod';

export type CatalogueIndex = z.infer<typeof catalogueIndexSchema>;

export const catalogueIndexSchema = z
  .object({
    '?xml': z.any(),
    dataIndex: z
      .object({
        '@_battleScribeVersion': z.string(),
        '@_indexUrl': z.string().url(),
        '@_name': z.string(),
        '@_xmlns': z.literal(
          'http://www.battlescribe.net/schema/dataIndexSchema'
        ),
        repositoryUrls: z.string(),
        dataIndexEntries: z
          .object({
            dataIndexEntry: z.array(
              z
                .object({
                  '@_dataBattleScribeVersion': z.string(),
                  '@_dataId': z.string(),
                  '@_dataName': z.string(),
                  '@_dataRevision': z.string(),
                  '@_dataType': z.enum(['catalogue', 'gamesystem']),
                  '@_filePath': z.string(),
                })
                .strict()
            ),
          })
          .strict(),
      })
      .strict(),
  })
  .strict();
