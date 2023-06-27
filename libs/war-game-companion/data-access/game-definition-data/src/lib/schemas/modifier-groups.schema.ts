import { z } from 'zod';

import { conditionGroupsSchema } from './condition-groups.schema';
import { conditionsSchema } from './conditions-schema';
import { modifiersSchema } from './modifiers-schema';
import { repeatsSchema } from './repeats.schema';

const modifierGroupBaseSchema = z.object({
  comment: z.string().optional(),
  conditions: conditionsSchema.optional(),
  modifiers: modifiersSchema.optional(),
  conditionGroups: conditionGroupsSchema.optional(),
  repeats: repeatsSchema.optional(),
});

type ModifierGroup = z.infer<typeof modifierGroupBaseSchema> & {
  modifierGroups?: { modifierGroup: ModifierGroup[] };
};

const modifierGroupSchema: z.ZodType<ModifierGroup> = modifierGroupBaseSchema
  .extend({
    modifierGroups: z
      .lazy(() =>
        z
          .object({
            modifierGroup: z.array(modifierGroupSchema),
          })
          .strict()
      )
      .optional(),
  })
  .strict();

export const modifierGroupsSchema = z
  .object({
    modifierGroup: z.array(modifierGroupSchema),
  })
  .strict();
