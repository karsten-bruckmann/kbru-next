import { z, ZodType } from 'zod';

export interface DataIdAware {
  '@_dataId': string;
}

export const dataIdSchema: ZodType<DataIdAware> = z.object({
  '@_dataId': z.string(),
});
