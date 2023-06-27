import { z, ZodType } from 'zod';

import { categoryLinksSchema } from './category-links.schema';
import { constraintsSchema } from './constraints.schema';
import { modifiersSchema } from './modifiers-schema';
import { rulesSchema } from './rules.schema';
import { booleanSchema } from './scalar/boolean.schema';

const forceEntryBaseSchema = z.object({
  '@_hidden': booleanSchema,
  '@_id': z.string(),
  '@_name': z.string(),
  categoryLinks: categoryLinksSchema,
  modifiers: modifiersSchema.optional(),
  constraints: constraintsSchema.optional(),
  rules: rulesSchema.optional(),
});

export type ForceEntry = z.infer<typeof forceEntryBaseSchema> & {
  forceEntries?: { forceEntry: ForceEntry[] };
};

const forceEntrySchema: z.ZodType<ForceEntry> = forceEntryBaseSchema
  .extend({
    forceEntries: z
      .lazy(() => z.object({ forceEntry: z.array(forceEntrySchema) }).strict())
      .optional(),
  })
  .strict();

export interface ForceEntriesAware {
  forceEntry: ForceEntry[];
}

export const forceEntriesSchema: ZodType<ForceEntriesAware> = z
  .object({
    forceEntry: z.array(forceEntrySchema),
  })
  .strict();
