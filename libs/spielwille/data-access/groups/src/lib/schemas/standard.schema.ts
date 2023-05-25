// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { skatListSchema } from '@kbru/spielwille/data-access/skat-lists';
import { z } from 'zod';

export type Standard = z.infer<typeof standardSchema>;

export const standardSchema = skatListSchema.shape.rules;
