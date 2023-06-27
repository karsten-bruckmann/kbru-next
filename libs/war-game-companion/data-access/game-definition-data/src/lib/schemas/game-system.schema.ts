import { z } from 'zod';

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

export type GameSystemSchema = z.infer<typeof gameSystemSchema>;

export const gameSystemSchema = z
  .object({
    '?xml': z.any(),
    gameSystem: z
      .object({
        '@_authorContact': z.string(),
        '@_authorName': z.string(),
        '@_authorUrl': z.string().url().optional(),
        '@_battleScribeVersion': z.string(),
        '@_id': z.string(),
        '@_name': z.string(),
        '@_revision': z.string(),
        '@_xmlns': z.literal(
          'http://www.battlescribe.net/schema/gameSystemSchema'
        ),
        readme: z.string().optional(),
        categoryEntries: categoryEntriesSchema,
        costTypes: costTypesSchema,
        entryLinks: entryLinksSchema.optional(),
        forceEntries: forceEntriesSchema,
        publications: publicationsSchema,
        profileTypes: profileTypesSchema,
        sharedSelectionEntries: selectionEntriesSchema,
        sharedSelectionEntryGroups: selectionEntryGroupsSchema.optional(),
        sharedRules: rulesSchema.optional(),
        sharedProfiles: profilesSchema.optional(),
        selectionEntries: selectionEntriesSchema.optional(),
        sharedInfoGroups: infoGroupsSchema.optional(),
        profiles: profilesSchema.optional(),
        rules: rulesSchema.optional(),
        infoLinks: infoLinksSchema.optional(),
      })
      .strict(),
  })
  .strict();
