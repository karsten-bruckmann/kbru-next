import { z } from 'zod';

import {
  CategoryLinksAware,
  categoryLinksSchema,
} from './category-links.schema';
import { ConstraintsAware, constraintsSchema } from './constraints.schema';
import { CostsAware, costsSchema } from './costs.schema';
import { EntryLinksAware, entryLinksSchema } from './entry-links.schema';
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
  SelectionEntryGroupsAware,
  selectionEntryGroupsSchema,
} from './selection-entry-groups.schema';

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

type SelectionEntry = {
  '@_id': string;
  '@_name': string;
  '@_hidden': BooleanEnum;
  '@_collective': BooleanEnum;
  '@_import': BooleanEnum;
  '@_type': 'upgrade' | 'model' | 'unit';
  '@_publicationId'?: string;
  '@_page'?: string;
  comment?: string;
  infoLinks?: InfoLinksAware;
  modifiers?: ModifiersAware;
  constraints?: ConstraintsAware;
  categoryLinks?: CategoryLinksAware;
  rules?: RulesAware;
  costs?: CostsAware;
  profiles?: ProfilesAware;
  modifierGroups?: ModifierGroupsAware;
  infoGroups?: InfoGroupsAware;
  selectionEntries?: SelectionEntriesAware;
  selectionEntryGroups?: SelectionEntryGroupsAware;
  entryLinks?: EntryLinksAware;
};

export interface SelectionEntriesAware {
  selectionEntry: SelectionEntry[];
}

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
