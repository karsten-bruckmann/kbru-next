import { z } from 'zod';

import { booleanSchema } from './boolean.schema';
import { categoryEntriesSchema } from './category-entries.schema';
import { costTypesSchema } from './cost-types.schema';
import { entryLinksSchema } from './entry-links.schema';
import { forceEntriesSchema } from './force-entries.schema';
import { infoGroupsSchema } from './info.groups.schema';
import { infoLinksSchema } from './info-links.schema';
import { profileTypesSchema } from './profile-types.schema';
import { profilesSchema } from './profiles.schema';
import { publicationsSchema } from './publications.schema';
import { rulesSchema } from './rules.schema';
import { selectionEntriesSchema } from './selection-entries.schema';
import { selectionEntryGroupsSchema } from './selection-entry-groups.schema';

export type Catalogue = z.infer<typeof catalogueSchema>;

export const catalogueSchema = z
  .object({
    '?xml': z.any(),
    catalogue: z
      .object({
        '@_authorContact': z.string().optional(),
        '@_authorName': z.string().optional(),
        '@_authorUrl': z.string().url().optional(),
        '@_battleScribeVersion': z.string(),
        '@_id': z.string(),
        '@_name': z.string(),
        '@_revision': z.string(),
        '@_xmlns': z.literal(
          'http://www.battlescribe.net/schema/catalogueSchema'
        ),
        '@_library': booleanSchema,
        '@_gameSystemId': z.string(),
        '@_gameSystemRevision': z.string(),
        readme: z.string().optional(),
        comment: z.string().optional(),
        rules: rulesSchema.optional(),
        categoryEntries: categoryEntriesSchema.optional(),
        costTypes: costTypesSchema.optional(),
        entryLinks: entryLinksSchema.optional(),
        publications: publicationsSchema.optional(),
        profileTypes: profileTypesSchema.optional(),
        selectionEntries: selectionEntriesSchema.optional(),
        sharedSelectionEntries: selectionEntriesSchema.optional(),
        sharedSelectionEntryGroups: selectionEntryGroupsSchema.optional(),
        sharedRules: rulesSchema.optional(),
        sharedProfiles: profilesSchema.optional(),
        infoLinks: infoLinksSchema.optional(),
        forceEntries: forceEntriesSchema.optional(),
        sharedInfoGroups: infoGroupsSchema,
        catalogueLinks: z.any(),
      })
      .strict(),
  })
  .strict();
