import { z } from 'zod';

import { catalogueLinksSchema } from '../schemas/catalogue-links.schema';

export interface CatalogueLink {
  id: string;
  name: string;
  targetId: string;
  type: 'catalogue';
  importRootEntries: boolean;
}

export const getCatalogueLinks = (
  data?: z.infer<typeof catalogueLinksSchema>
): CatalogueLink[] => {
  return !data
    ? []
    : data.catalogueLink.map((cl) => ({
        id: cl['@_id'],
        name: cl['@_name'],
        targetId: cl['@_targetId'],
        type: cl['@_type'],
        importRootEntries: cl['@_importRootEntries'] === 'true',
      }));
};
