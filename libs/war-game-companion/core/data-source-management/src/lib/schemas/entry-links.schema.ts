import { z } from 'zod';

import { booleanSchema } from './boolean.schema';
import { categoryLinksSchema } from './category-links.schema';
import { constraintsSchema } from './constraints.schema';
import { costsSchema } from './costs.schema';
import { infoGroupsSchema } from './info.groups.schema';
import { infoLinksSchema } from './info-links.schema';
import { modifierGroupsSchema } from './modifier-groups.schema';
import { modifiersSchema } from './modifiers-schema';
import { profilesSchema } from './profiles.schema';
import { rulesSchema } from './rules.schema';
import { selectionEntriesSchema } from './selection-entries.schema';
import { selectionEntryGroupsSchema } from './selection-entry-groups.schema';

const entryLinkBaseSchema = z.object({
  '@_hidden': booleanSchema,
  '@_id': z.string(),
  '@_name': z.string(),
  '@_collective': booleanSchema,
  '@_import': booleanSchema,
  '@_targetId': z.string(),
  '@_type': z.enum(['selectionEntry', 'selectionEntryGroup']),
  '@_publicationId': z.string().optional(),
  '@_page': z.string().optional(),
  comment: z.string().optional(),
  categoryLinks: categoryLinksSchema.optional(),
  modifiers: modifiersSchema.optional(),
  modifierGroups: modifierGroupsSchema.optional(),
  constraints: constraintsSchema.optional(),
  costs: costsSchema.optional(),
  profiles: profilesSchema.optional(),
  infoLinks: infoLinksSchema.optional(),
  infoGroups: infoGroupsSchema.optional(),
  selectionEntryGroups: selectionEntryGroupsSchema.optional(),
  rules: rulesSchema.optional(),
});

type EntryLink = z.infer<typeof entryLinkBaseSchema> & {
  entryLinks?: { entryLink: EntryLink[] };
  selectionEntries?: z.infer<typeof selectionEntriesSchema>;
};

const selectionEntrySchema: z.ZodType<EntryLink> = entryLinkBaseSchema
  .extend({
    entryLinks: z
      .lazy(() =>
        z
          .object({
            entryLink: z.array(selectionEntrySchema),
          })
          .strict()
      )
      .optional(),
    selectionEntries: z.lazy(() => selectionEntriesSchema).optional(),
  })
  .strict();

export const entryLinksSchema = z
  .object({
    entryLink: z.array(selectionEntrySchema),
  })
  .strict();
