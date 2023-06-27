import { z, ZodType } from 'zod';

import {
  ConditionGroupsAware,
  conditionGroupsSchema,
} from './condition-groups.schema';
import { ConditionsAware, conditionsSchema } from './conditions-schema';
import { RepeatsAware, repeatsSchema } from './repeats.schema';

export interface ModifiersAware {
  modifier: {
    '@_type':
      | 'set'
      | 'increment'
      | 'decrement'
      | 'append'
      | 'add'
      | 'remove'
      | 'set-primary';
    '@_field': 'hidden' | string;
    '@_value': string;
    comment?: string;
    conditions?: ConditionsAware;
    repeats?: RepeatsAware;
    conditionGroups?: ConditionGroupsAware;
  }[];
}

export const modifiersSchema: ZodType<ModifiersAware> = z
  .object({
    modifier: z.array(
      z
        .object({
          '@_type': z.enum([
            'set',
            'increment',
            'decrement',
            'append',
            'add',
            'remove',
            'set-primary',
          ]),
          '@_field': z.union([z.string(), z.literal('hidden')]),
          '@_value': z.string(),
          comment: z.string().optional(),
          conditions: conditionsSchema.optional(),
          repeats: repeatsSchema.optional(),
          conditionGroups: conditionGroupsSchema.optional(),
        })
        .strict()
    ),
  })
  .strict();
