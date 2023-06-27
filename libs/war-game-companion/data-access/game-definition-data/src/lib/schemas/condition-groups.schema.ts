import { z, ZodType } from 'zod';

import { ConditionsAware, conditionsSchema } from './conditions-schema';

const conditionGroupBaseSchema = z
  .object({
    '@_type': z.enum(['or', 'and']),
    comment: z.string().optional(),
    conditions: conditionsSchema.optional(),
  })
  .strict();

export interface ConditionGroupsAware {
  conditionGroup: ConditionGroup[];
}

type ConditionGroup = z.infer<typeof conditionGroupBaseSchema> & {
  '@_type': 'or' | 'and';
  comment?: string;
  conditions?: ConditionsAware;
  conditionGroups?: ConditionGroupsAware;
};

const conditionGroupSchema: z.ZodType<ConditionGroup> = z
  .object({
    '@_type': z.enum(['or', 'and']),
    comment: z.string().optional(),
    conditions: conditionsSchema.optional(),
    conditionGroups: z
      .lazy(() =>
        z
          .object({
            conditionGroup: z.array(conditionGroupSchema),
          })
          .strict()
      )
      .optional(),
  })
  .strict();

export const conditionGroupsSchema: ZodType<ConditionGroupsAware> = z
  .object({
    conditionGroup: z.array(conditionGroupSchema),
  })
  .strict();
