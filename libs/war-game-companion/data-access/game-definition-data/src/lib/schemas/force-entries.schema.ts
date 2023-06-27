import { z } from 'zod';

import { booleanSchema } from './boolean.schema';
import { categoryLinksSchema } from './category-links.schema';
import { constraintsSchema } from './constraints.schema';
import { modifiersSchema } from './modifiers-schema';
import { rulesSchema } from './rules.schema';

const forceEntryBaseSchema = z.object({
  '@_hidden': booleanSchema,
  '@_id': z.string(),
  '@_name': z.string(),
  categoryLinks: categoryLinksSchema,
  modifiers: modifiersSchema.optional(),
  constraints: constraintsSchema.optional(),
  rules: rulesSchema.optional(),
});

type ForceEntry = z.infer<typeof forceEntryBaseSchema> & {
  forceEntries?: { forceEntry: ForceEntry[] };
};

const forceEntrySchema: z.ZodType<ForceEntry> = forceEntryBaseSchema
  .extend({
    forceEntries: z
      .lazy(() => z.object({ forceEntry: z.array(forceEntrySchema) }).strict())
      .optional(),
  })
  .strict();

export const forceEntriesSchema = z
  .object({
    forceEntry: z.array(forceEntrySchema),
  })
  .strict();
