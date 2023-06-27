import { z, ZodType } from 'zod';

import {
  CatalogueLinksAware,
  catalogueLinksSchema,
} from './catalogue-links.schema';
import {
  CategoryEntriesAware,
  categoryEntriesSchema,
} from './category-entries.schema';
import { CostTypesAware, costTypesSchema } from './cost-types.schema';
import { EntryLinksAware, entryLinksSchema } from './entry-links.schema';
import { ForceEntriesAware, forceEntriesSchema } from './force-entries.schema';
import { InfoGroupsAware, infoGroupsSchema } from './info.groups.schema';
import { InfoLinksAware, infoLinksSchema } from './info-links.schema';
import { ProfileTypesAware, profileTypesSchema } from './profile-types.schema';
import { ProfilesAware, profilesSchema } from './profiles.schema';
import { PublicationsAware, publicationsSchema } from './publications.schema';
import { RulesAware, rulesSchema } from './rules.schema';
import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';
import {
  SelectionEntriesAware,
  selectionEntriesSchema,
} from './selection-entries.schema';
import {
  SelectionEntryGroupsAware,
  selectionEntryGroupsSchema,
} from './selection-entry-groups.schema';

export interface Catalogue {
  xml?: unknown;
  catalogue: {
    '@_battleScribeVersion': string;
    '@_id': string;
    '@_name': string;
    '@_xmlns': string;
    '@_revision': string;
    '@_authorContact'?: string;
    '@_authorName'?: string;
    '@_authorUrl'?: string;
    '@_library'?: BooleanEnum;
    '@_gameSystemId'?: string;
    '@_gameSystemRevision'?: string;
    readme?: string;
    comment?: string;
    rules?: RulesAware;
    categoryEntries?: CategoryEntriesAware;
    costTypes?: CostTypesAware;
    entryLinks?: EntryLinksAware;
    publications?: PublicationsAware;
    profileTypes?: ProfileTypesAware;
    selectionEntries?: SelectionEntriesAware;
    sharedSelectionEntries?: SelectionEntriesAware;
    sharedSelectionEntryGroups?: SelectionEntryGroupsAware;
    sharedRules?: RulesAware;
    sharedProfiles?: ProfilesAware;
    infoLinks?: InfoLinksAware;
    forceEntries?: ForceEntriesAware;
    sharedInfoGroups?: InfoGroupsAware;
    catalogueLinks?: CatalogueLinksAware;
  };
}

export const catalogueSchema: ZodType<Catalogue> = z
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
        '@_xmlns': z.string(),
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
        sharedInfoGroups: infoGroupsSchema.optional(),
        catalogueLinks: catalogueLinksSchema.optional(),
      })
      .strict(),
  })
  .strict();
