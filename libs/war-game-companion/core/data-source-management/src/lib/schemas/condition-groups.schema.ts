import { z } from 'zod';

import { conditionsSchema } from './conditions-schema';

const conditionGroupBaseSchema = z
  .object({
    '@_type': z.enum(['or', 'and']),
    comment: z.string().optional(),
    conditions: conditionsSchema.optional(),
  })
  .strict();

type ConditionGroup = z.infer<typeof conditionGroupBaseSchema> & {
  conditionGroups?: {
    conditionGroup: ConditionGroup[];
  };
};

const conditionGroupSchema: z.ZodType<ConditionGroup> =
  conditionGroupBaseSchema.extend({
    conditionGroups: z
      .lazy(() =>
        z
          .object({
            conditionGroup: z.array(conditionGroupSchema),
          })
          .strict()
      )
      .optional(),
  });

export const conditionGroupsSchema = z
  .object({
    conditionGroup: z.array(conditionGroupSchema),
  })
  .strict();
