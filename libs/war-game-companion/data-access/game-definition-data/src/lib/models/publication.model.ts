import { z } from 'zod';

import { publicationsSchema } from '../schemas/publications.schema';

export interface Publication {
  id: string;
  name: string;
  shortName?: string;
  publisher?: string;
  publicationDate?: string;
  publisherUrl?: string;
  comment?: string;
}

export const getPublications = (
  data?: z.infer<typeof publicationsSchema>
): Publication[] => {
  return !data
    ? []
    : data.publication.map((p) => ({
        id: p['@_id'],
        name: p['@_name'],
        shortName: p['@_shortName'],
        publisher: p['@_publisher'],
        publicationDate: p['@_publicationDate'],
        publisherUrl: p['@_publisherUrl'],
        comment: p.comment,
      }));
};
