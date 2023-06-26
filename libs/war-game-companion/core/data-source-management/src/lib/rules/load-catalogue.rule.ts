import { XMLParser } from 'fast-xml-parser';

import { Catalogue, catalogueSchema } from '../schemas/catalogue.schema';
import { unzipSingleFileContainer } from './unzip-single-file-container.rule';

export const loadCatalogue = async (
  get: (url: string) => Promise<ArrayBuffer>,
  url: string
): Promise<Catalogue> => {
  const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(url);
  const zipData = await get(proxyUrl);
  const blob = new Blob([zipData], { type: 'text/plain' });
  const file = new File([blob], 'foo.txt', {
    type: 'text/plain',
  });
  const xmlData = await (await unzipSingleFileContainer(file)).text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    isArray: (tagName) =>
      [
        'dataIndexEntry',
        'forceEntry',
        'categoryEntry',
        'categoryLink',
        'conditionGroup',
        'condition',
        'constraint',
        'costType',
        'entryLink',
        'modifier',
        'characteristicType',
        'repeat',
        'rule',
        'infoLink',
        'selectionEntry',
        'cost',
        'selectionEntryGroup',
        'profile',
        'modifierGroup',
        'profileType',
        'publication',
      ].includes(tagName),
  });

  const data = parser.parse(xmlData);
  return catalogueSchema.parse(data);
};
