import { z } from 'zod';

import { InfoLinksAware, infoLinksSchema } from './info-links.schema';
import { ProfilesAware, profilesSchema } from './profiles.schema';
import { RulesAware, rulesSchema } from './rules.schema';
import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface InfoGroupsAware {
  infoGroup: {
    '@_id': string;
    '@_name': string;
    '@_publicationId'?: string;
    '@_page'?: string;
    '@_hidden': BooleanEnum;
    infoLinks?: InfoLinksAware;
    rules?: RulesAware;
    profiles?: ProfilesAware;
  }[];
}

export const infoGroupsSchema = z
  .object({
    infoGroup: z.array(
      z
        .object({
          '@_id': z.string(),
          '@_name': z.string(),
          '@_publicationId': z.string().optional(),
          '@_page': z.string().optional(),
          '@_hidden': booleanSchema,
          infoLinks: infoLinksSchema.optional(),
          rules: rulesSchema.optional(),
          profiles: profilesSchema.optional(),
        })
        .strict()
    ),
  })
  .strict();
