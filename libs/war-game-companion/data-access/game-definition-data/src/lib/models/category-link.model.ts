import { z } from 'zod';

import { categoryLinksSchema } from '../schemas/category-links.schema';
import { Constraint, getConstraints } from './constraint.model';
import { getModifiers, Modifier } from './modifier.model';

export interface CategoryLink {
  __type: 'CategoryLink';
  hidden: boolean;
  id: string;
  primary: boolean;
  targetId: string;
  name?: string;
  publicationId?: string;
  comment?: string;
  constraints: Constraint[];
  modifiers: Modifier[];
}

export const getCategoryLinks = (
  data?: z.infer<typeof categoryLinksSchema>
): CategoryLink[] => {
  return !data
    ? []
    : data.categoryLink.map((cl) => ({
        __type: 'CategoryLink',
        hidden: cl['@_hidden'] === 'true',
        id: cl['@_id'],
        primary: cl['@_primary'] === 'true',
        targetId: cl['@_targetId'],
        name: cl['@_name'],
        publicationId: cl['@_publicationId'],
        comment: cl.comment,
        constraints: getConstraints(cl.constraints),
        modifiers: getModifiers(cl.modifiers),
      }));
};
