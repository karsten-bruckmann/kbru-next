import { z, ZodType } from 'zod';

export interface FilePathAware {
  '@_filePath': string;
}

export const filePathSchema: ZodType<FilePathAware> = z.object({
  '@_filePath': z.string(),
});
