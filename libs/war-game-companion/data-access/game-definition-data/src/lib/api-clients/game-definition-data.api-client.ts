import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlobReader, BlobWriter, ZipReader } from '@zip.js/zip.js';
import { XMLParser } from 'fast-xml-parser';
import {
  combineLatest,
  firstValueFrom,
  from,
  map,
  Observable,
  switchMap,
} from 'rxjs';

import { Catalogue, catalogueSchema } from '../schemas/catalogue.schema';
import {
  CatalogueIndex,
  catalogueIndexSchema,
} from '../schemas/catalogue-index.schema';
import { GameSystem, gameSystemSchema } from '../schemas/game-system.schema';

export interface GameDefinitionDataResponse {
  gameSystems: Record<string, GameSystem['gameSystem']>;
  catalogues: Record<string, Catalogue['catalogue']>;
}

export const unzipSingleFileContainer = async (file: File): Promise<File> => {
  const zipFileReader = new BlobReader(file);
  const zipFileWriter = new BlobWriter();
  const zipReader = new ZipReader(zipFileReader);
  const entries = await zipReader.getEntries();
  const firstEntry = entries.shift();
  if (!firstEntry) {
    throw new Error('No file in zipped roster');
  }

  const name = firstEntry.filename;
  const blob: Blob[] = [await firstEntry.getData(zipFileWriter)];

  return new File(blob, name);
};

const xmlArrayKeys = [
  'categoryEntry',
  'categoryLink',
  'characteristicType',
  'condition',
  'conditionGroup',
  'constraint',
  'cost',
  'costType',
  'dataIndexEntry',
  'entryLink',
  'forceEntry',
  'infoLink',
  'infoGroup',
  'modifier',
  'modifierGroup',
  'profile',
  'profileType',
  'publication',
  'repeat',
  'rule',
  'selectionEntry',
  'selectionEntryGroup',
  'characteristic',
  'catalogueLink',
];

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

export const loadGameSystem = async (
  get: (url: string) => Promise<ArrayBuffer>,
  url: string
): Promise<GameSystem> => {
  const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(url);
  const zipData = await get(proxyUrl);
  const blob = new Blob([zipData], { type: 'text/plain' });
  const file = new File([blob], 'foo.txt', {
    type: 'text/plain',
  });
  const xmlData = await (await unzipSingleFileContainer(file)).text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    isArray: (tagName) => xmlArrayKeys.includes(tagName),
  });

  const data = parser.parse(xmlData);
  return gameSystemSchema.parse(data);
};

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
    isArray: (tagName) => xmlArrayKeys.includes(tagName),
  });

  const data = parser.parse(xmlData);
  return catalogueSchema.parse(data);
};

@Injectable({ providedIn: 'root' })
export class GameDefinitionDataApiClient {
  constructor(private http: HttpClient) {}

  public get(indexFileUrl: string): Observable<GameDefinitionDataResponse> {
    return from(
      loadDataSource(
        (url) =>
          firstValueFrom(this.http.get(url, { responseType: 'arraybuffer' })),
        indexFileUrl
      )
    ).pipe(
      switchMap((catalogueIndex) =>
        combineLatest([
          combineLatest(
            catalogueIndex.dataIndex.dataIndexEntries.dataIndexEntry
              .filter((entry) => entry['@_dataType'] === 'gamesystem')
              .map((entry) =>
                loadGameSystem(
                  (url) =>
                    firstValueFrom(
                      this.http.get(url, { responseType: 'arraybuffer' })
                    ),
                  `${indexFileUrl.replace(/\/[^/]+$/, '')}/${encodeURIComponent(
                    entry['@_filePath']
                  )}`
                )
              )
          ),
          combineLatest(
            catalogueIndex.dataIndex.dataIndexEntries.dataIndexEntry
              .filter((entry) => entry['@_dataType'] === 'catalogue')
              .map((entry) =>
                loadCatalogue(
                  (url) =>
                    firstValueFrom(
                      this.http.get(url, { responseType: 'arraybuffer' })
                    ),
                  `${indexFileUrl.replace(/\/[^/]+$/, '')}/${encodeURIComponent(
                    entry['@_filePath']
                  )}`
                )
              )
          ),
        ])
      ),
      map(
        ([gameSystems, catalogues]): GameDefinitionDataResponse => ({
          gameSystems: gameSystems.reduce<
            Record<string, GameSystem['gameSystem']>
          >(
            (record, gameSystem) => ({
              ...record,
              [gameSystem.gameSystem['@_id']]: gameSystem.gameSystem,
            }),
            {}
          ),
          catalogues: catalogues.reduce<Record<string, Catalogue['catalogue']>>(
            (record, catalogue) => ({
              ...record,
              [catalogue.catalogue['@_id']]: catalogue.catalogue,
            }),
            {}
          ),
        })
      )
    );
  }
}
