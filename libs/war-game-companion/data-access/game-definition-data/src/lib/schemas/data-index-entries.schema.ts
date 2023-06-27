import { z, ZodType } from 'zod';

export interface DataIndexEntry {
  '@_dataBattleScribeVersion': string;
  '@_dataId': string;
  '@_dataName': string;
  '@_dataRevision': string;
  '@_dataType': 'catalogue' | 'gamesystem';
  '@_filePath': string;
}

export interface DataIndexEntriesAware {
  dataIndexEntry: DataIndexEntry[];
}

export const dataIndexEntriesSchema: ZodType<DataIndexEntriesAware> = z
  .object({
    dataIndexEntry: z.array(
      z.object({
        '@_dataBattleScribeVersion': z.string(),
        '@_dataId': z.string(),
        '@_dataName': z.string(),
        '@_dataRevision': z.string(),
        '@_dataType': z.enum(['catalogue', 'gamesystem']),
        '@_filePath': z.string(),
      })
    ),
  })
  .strict();
