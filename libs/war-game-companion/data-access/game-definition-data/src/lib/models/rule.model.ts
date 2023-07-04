import { z } from 'zod';

import { rulesSchema } from '../schemas/rules.schema';
import { getModifiers, Modifier } from './modifier.model';
import { getModifierGroups, ModifierGroup } from './modifier-group.model';

export type Rule = {
  hidden: boolean;
  id: string;
  name: string;
  publicationId?: string;
  page?: string;
  modifiers: Modifier[];
  modifierGroups: ModifierGroup[];
  comment?: string;
  description?: string;
};

export const getRules = (data?: z.infer<typeof rulesSchema>): Rule[] => {
  return !data
    ? []
    : data.rule.map((r) => ({
        hidden: r['@_hidden'] === 'true',
        id: r['@_id'],
        name: r['@_name'],
        publicationId: r['@_publicationId'],
        page: r['@_page'],
        modifiers: getModifiers(r.modifiers),
        modifierGroups: getModifierGroups(r.modifierGroups),
        comment: r.comment,
        description: r.description,
      }));
};
