import { z, ZodType } from 'zod';

import {
  CategoryLinksAware,
  categoryLinksSchema,
} from './category-links.schema';
import { ConstraintsAware, constraintsSchema } from './constraints.schema';
import { CostsAware, costsSchema } from './costs.schema';
import { InfoGroupsAware, infoGroupsSchema } from './info.groups.schema';
import { InfoLinksAware, infoLinksSchema } from './info-links.schema';
import {
  ModifierGroupsAware,
  modifierGroupsSchema,
} from './modifier-groups.schema';
import { ModifiersAware, modifiersSchema } from './modifiers-schema';
import { ProfilesAware, profilesSchema } from './profiles.schema';
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

export interface EntryLinksAware {
  entryLink: EntryLink[];
}

export interface EntryLink {
  '@_hidden': BooleanEnum;
  '@_id': string;
  '@_name'?: string;
  '@_collective': BooleanEnum;
  '@_import'?: BooleanEnum;
  '@_targetId': string;
  '@_type': 'selectionEntry' | 'selectionEntryGroup';
  '@_publicationId'?: string;
  '@_page'?: string;
  comment?: string;
  categoryLinks?: CategoryLinksAware;
  modifiers?: ModifiersAware;
  modifierGroups?: ModifierGroupsAware;
  constraints?: ConstraintsAware;
  costs?: CostsAware;
  profiles?: ProfilesAware;
  infoLinks?: InfoLinksAware;
  infoGroups?: InfoGroupsAware;
  selectionEntryGroups?: SelectionEntryGroupsAware;
  rules?: RulesAware;
  entryLinks?: EntryLinksAware;
  selectionEntries?: SelectionEntriesAware;
}

export const entryLinksSchema: ZodType<EntryLinksAware> = z
  .object({
    entryLink: z.array(
      z
        .object({
          '@_hidden': booleanSchema,
          '@_id': z.string(),
          '@_name': z.string().optional(),
          '@_collective': booleanSchema,
          '@_import': booleanSchema.optional(),
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
          entryLinks: z.lazy(() => entryLinksSchema).optional(),
          selectionEntries: z.lazy(() => selectionEntriesSchema).optional(),
        })
        .strict()
    ),
  })
  .strict();
