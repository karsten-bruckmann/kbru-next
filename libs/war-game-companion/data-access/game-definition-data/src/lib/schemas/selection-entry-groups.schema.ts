import { z } from 'zod';

import { booleanSchema } from './boolean.schema';
import { categoryLinksSchema } from './category-links.schema';
import { constraintsSchema } from './constraints.schema';
import { entryLinksSchema } from './entry-links.schema';
import { modifierGroupsSchema } from './modifier-groups.schema';
import { modifiersSchema } from './modifiers-schema';
import { profilesSchema } from './profiles.schema';
import { selectionEntriesSchema } from './selection-entries.schema';

const selectionEntryGroupBaseSchema = z.object({
  '@_id': z.string(),
  '@_name': z.string(),
  '@_hidden': booleanSchema,
  '@_collective': booleanSchema,
  '@_import': booleanSchema,
  '@_defaultSelectionEntryId': z.string().optional(),
  '@_publicationId': z.string().optional(),
  '@_page': z.string().optional(),
  comment: z.string().optional(),
  modifiers: modifiersSchema.optional(),
  constraints: constraintsSchema.optional(),
  modifierGroups: modifierGroupsSchema.optional(),
  profiles: profilesSchema.optional(),
  categoryLinks: categoryLinksSchema.optional(),
});

type SelectionEntryGroup = z.infer<typeof selectionEntryGroupBaseSchema> & {
  selectionEntryGroups?: { selectionEntryGroup: SelectionEntryGroup[] };
  selectionEntries?: z.infer<typeof selectionEntriesSchema>;
  entryLinks?: z.infer<typeof entryLinksSchema>;
};

const selectionEntryGroupSchema: z.ZodType<SelectionEntryGroup> =
  selectionEntryGroupBaseSchema
    .extend({
      selectionEntryGroups: z
        .lazy(() =>
          z
            .object({
              selectionEntryGroup: z.array(selectionEntryGroupSchema),
            })
            .strict()
        )
        .optional(),
      selectionEntries: z.lazy(() => selectionEntriesSchema).optional(),
      entryLinks: z.lazy(() => entryLinksSchema).optional(),
    })
    .strict();

export const selectionEntryGroupsSchema = z
  .object({
    selectionEntryGroup: z.array(selectionEntryGroupSchema),
  })
  .strict();
