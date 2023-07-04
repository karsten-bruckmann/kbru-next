import { z } from 'zod';

import { infoLinksSchema } from '../schemas/info-links.schema';
import { getModifiers, Modifier } from './modifier.model';
import { getModifierGroups, ModifierGroup } from './modifier-group.model';

export interface InfoLink {
  hidden: boolean;
  id: string;
  name?: string;
  targetId: string;
  type: 'profile' | 'rule' | 'infoGroup';
  publicationId?: string;
  page?: string;
  comment?: string;
  modifiers: Modifier[];
  modifierGroups: ModifierGroup[];
}

export const getInfoLinks = (
  data?: z.infer<typeof infoLinksSchema>
): InfoLink[] => {
  return !data
    ? []
    : data.infoLink.map((il) => ({
        hidden: il['@_hidden'] === 'true',
        id: il['@_id'],
        name: il['@_name'],
        targetId: il['@_targetId'],
        type: il['@_type'],
        publicationId: il['@_publicationId'],
        page: il['@_page'],
        comment: il.comment,
        modifiers: getModifiers(il.modifiers),
        modifierGroups: getModifierGroups(il.modifierGroups),
      }));
};
