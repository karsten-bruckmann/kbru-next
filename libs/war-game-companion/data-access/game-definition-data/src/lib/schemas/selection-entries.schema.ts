import { z } from 'zod';

import { booleanSchema } from './boolean.schema';
import { categoryLinksSchema } from './category-links.schema';
import { constraintsSchema } from './constraints.schema';
import { costsSchema } from './costs.schema';
import { entryLinksSchema } from './entry-links.schema';
import { infoGroupsSchema } from './info.groups.schema';
import { infoLinksSchema } from './info-links.schema';
import { modifierGroupsSchema } from './modifier-groups.schema';
import { modifiersSchema } from './modifiers-schema';
import { profilesSchema } from './profiles.schema';
import { rulesSchema } from './rules.schema';
import { selectionEntryGroupsSchema } from './selection-entry-groups.schema';

const selectionEntryBaseSchema = z.object({
  '@_id': z.string(),
  '@_name': z.string(),
  '@_hidden': booleanSchema,
  '@_collective': booleanSchema,
  '@_import': booleanSchema,
  '@_type': z.enum(['upgrade', 'model', 'unit']),
  '@_publicationId': z.string().optional(),
  '@_page': z.string().optional(),
  comment: z.string().optional(),
  infoLinks: infoLinksSchema.optional(),
  modifiers: modifiersSchema.optional(),
  constraints: constraintsSchema.optional(),
  categoryLinks: categoryLinksSchema.optional(),
  rules: rulesSchema.optional(),
  costs: costsSchema.optional(),
  profiles: profilesSchema.optional(),
  modifierGroups: modifierGroupsSchema.optional(),
  infoGroups: infoGroupsSchema.optional(),
});

type SelectionEntry = z.infer<typeof selectionEntryBaseSchema> & {
  selectionEntries?: { selectionEntry: SelectionEntry[] };
  selectionEntryGroups?: z.infer<typeof selectionEntryGroupsSchema>;
  entryLinks?: z.infer<typeof entryLinksSchema>;
};

const selectionEntrySchema: z.ZodType<SelectionEntry> = selectionEntryBaseSchema
  .extend({
    selectionEntries: z
      .lazy(() =>
        z
          .object({
            selectionEntry: z.array(selectionEntrySchema),
          })
          .strict()
      )
      .optional(),
    selectionEntryGroups: z.lazy(() => selectionEntryGroupsSchema).optional(),
    entryLinks: z.lazy(() => entryLinksSchema).optional(),
  })
  .strict();

export const selectionEntriesSchema = z
  .object({
    selectionEntry: z.array(selectionEntrySchema),
  })
  .strict();
