import { z, ZodType } from 'zod';

import {
  DataBattleScribeVersionAware,
  dataBattleScribeVersionSchema,
} from './scalar/data-battle-scribe-version.schema';
import { DataIdAware, dataIdSchema } from './scalar/data-id.schema';
import { DataNameAware, dataNameSchema } from './scalar/data-name.schema';
import {
  DataRevisionAware,
  dataRevisionSchema,
} from './scalar/data-revision.schema';
import { DataTypeAware, dataTypeSchema } from './scalar/data-type.schema';
import { FilePathAware, filePathSchema } from './scalar/file-path.schema';

export type DataIndexEntry = DataBattleScribeVersionAware &
  DataIdAware &
  DataNameAware &
  DataRevisionAware &
  DataTypeAware &
  FilePathAware;

export interface DataIndexEntryAware {
  dataIndexEntry: DataIndexEntry[];
}

export const dataIndexEntriesSchema: ZodType<DataIndexEntryAware> = z
  .object({
    dataIndexEntry: z.array(
      dataBattleScribeVersionSchema
        .and(dataIdSchema)
        .and(dataNameSchema)
        .and(dataRevisionSchema)
        .and(dataTypeSchema)
        .and(filePathSchema)
    ),
  })
  .strict();
