import { z, ZodType } from 'zod';

export interface DataRevisionAware {
  '@_dataRevision': string;
}

export const dataRevisionSchema: ZodType<DataRevisionAware> = z.object({
  '@_dataRevision': z.string(),
});
