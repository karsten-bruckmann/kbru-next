import { z } from 'zod';

import { skatListSchema } from './skat-list.schema';

export type SkatListsState = z.infer<typeof skatListsStateSchema>;

export const skatListsStateSchema = z.record(skatListSchema);
