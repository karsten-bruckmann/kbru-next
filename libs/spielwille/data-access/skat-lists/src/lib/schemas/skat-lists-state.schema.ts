import { z } from 'zod';

import { skatListSchema } from './skat-list.schema.schema';

export type SkatListsState = z.infer<typeof skatListsStateSchema>;

export const skatListsStateSchema = z.record(skatListSchema);
