import { z, ZodType } from 'zod';

import {
  CategoryLinksAware,
  categoryLinksSchema,
} from './category-links.schema';
import { ConstraintsAware, constraintsSchema } from './constraints.schema';
import { EntryLinksAware, entryLinksSchema } from './entry-links.schema';
import {
  ModifierGroupsAware,
  modifierGroupsSchema,
} from './modifier-groups.schema';
import { ModifiersAware, modifiersSchema } from './modifiers-schema';
import { ProfilesAware, profilesSchema } from './profiles.schema';
import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';
import {
  SelectionEntriesAware,
  selectionEntriesSchema,
} from './selection-entries.schema';

type SelectionEntryGroup = z.infer<typeof selectionEntryGroupBaseSchema> & {
  '@_id': string;
  '@_name': string;
  '@_hidden': BooleanEnum;
  '@_collective': BooleanEnum;
  '@_import': BooleanEnum;
  '@_defaultSelectionEntryId'?: string;
  '@_publicationId'?: string;
  '@_page'?: string;
  comment?: string;
  modifiers?: ModifiersAware;
  constraints?: ConstraintsAware;
  modifierGroups?: ModifierGroupsAware;
  profiles?: ProfilesAware;
  categoryLinks?: CategoryLinksAware;
  selectionEntryGroups?: SelectionEntryGroupsAware;
  selectionEntries?: SelectionEntriesAware;
  entryLinks?: EntryLinksAware;
};

export interface SelectionEntryGroupsAware {
  selectionEntryGroup: SelectionEntryGroup[];
}

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

const selectionEntryGroupSchema: z.ZodType<SelectionEntryGroup> = z
  .object({
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

export const selectionEntryGroupsSchema: ZodType<SelectionEntryGroupsAware> = z
  .object({
    selectionEntryGroup: z.array(selectionEntryGroupSchema),
  })
  .strict();
