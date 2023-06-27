import { z, ZodType } from 'zod';

export interface DataNameAware {
  '@_dataName': string;
}

export const dataNameSchema: ZodType<DataNameAware> = z.object({
  '@_dataName': z.string(),
});
