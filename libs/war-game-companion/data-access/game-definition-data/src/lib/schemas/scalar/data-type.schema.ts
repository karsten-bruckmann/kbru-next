import { z, ZodType } from 'zod';

export interface DataTypeAware {
  '@_dataType': 'catalogue' | 'gamesystem';
}

export const dataTypeSchema: ZodType<DataTypeAware> = z.object({
  '@_dataType': z.enum(['catalogue', 'gamesystem']),
});
