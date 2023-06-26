import { XMLParser } from 'fast-xml-parser';

import {
  CatalogueIndex,
  catalogueIndexSchema,
} from '../schemas/catalogue-index.schema';
import { unzipSingleFileContainer } from './unzip-single-file-container.rule';

export const loadDataSource = async (
  get: (url: string) => Promise<ArrayBuffer>,
  url: string
): Promise<CatalogueIndex> => {
  const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(url);
  const zipData = await get(proxyUrl);
  const blob = new Blob([zipData], { type: 'text/plain' });
  const file = new File([blob], 'foo.txt', {
    type: 'text/plain',
  });
  const xmlData = await (await unzipSingleFileContainer(file)).text();
  const parser = new XMLParser({
    ignoreAttributes: false,
  });
  const data = parser.parse(xmlData);
  console.log(data);
  return catalogueIndexSchema.parse(data);
};
