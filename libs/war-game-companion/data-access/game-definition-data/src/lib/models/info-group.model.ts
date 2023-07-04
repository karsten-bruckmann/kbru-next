import { z } from 'zod';

import { infoGroupsSchema } from '../schemas/info.groups.schema';
import { getInfoLinks, InfoLink } from './info-link.model';
import { getModifiers, Modifier } from './modifier.model';
import { getProfiles, Profile } from './profile.model';
import { getRules, Rule } from './rule.model';

export interface InfoGroup {
  id: string;
  name: string;
  publicationId?: string;
  page?: string;
  hidden: boolean;
  infoLinks: InfoLink[];
  rules: Rule[];
  profiles: Profile[];
  modifiers: Modifier[];
  infoGroups: InfoGroup[];
}

export const getInfoGroups = (
  data?: z.infer<typeof infoGroupsSchema>
): InfoGroup[] => {
  return !data
    ? []
    : data.infoGroup.map((ig) => ({
        id: ig['@_id'],
        name: ig['@_name'],
        publicationId: ig['@_publicationId'],
        page: ig['@_page'],
        hidden: ig['@_hidden'] === 'true',
        infoLinks: getInfoLinks(ig.infoLinks),
        rules: getRules(ig.rules),
        profiles: getProfiles(ig.profiles),
        modifiers: getModifiers(ig.modifiers),
        infoGroups: getInfoGroups(ig.infoGroups),
      }));
};
