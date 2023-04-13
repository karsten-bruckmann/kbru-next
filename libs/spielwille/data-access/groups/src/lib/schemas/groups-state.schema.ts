import { z } from 'zod';

import { Group, groupSchema } from './group.schema';

export type GroupsState = Record<string, Group>;

export const groupsStateSchema = z.record(groupSchema);
