import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BlobReader, BlobWriter, ZipReader } from '@zip.js/zip.js';
import { combineLatest, firstValueFrom, from, of, switchMap, tap } from 'rxjs';

import { dataSourceUrlAddedAction } from '../actions/data-source-url-added.action';
import { loadCatalogue } from '../rules/load-catalogue.rule';
import { loadDataSource } from '../rules/load-data-source.rule';
import { loadGameSystem } from '../rules/load-game-system.rule';
import { Catalogue } from '../schemas/catalogue.schema';

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

@Injectable()
export class LoadDataSourceFromUrlEffect {
  constructor(private actions$: Actions, private http: HttpClient) {}

  public effect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dataSourceUrlAddedAction),
        switchMap((action) => {
          return from(
            loadDataSource(
              (url) =>
                firstValueFrom(
                  this.http.get(url, { responseType: 'arraybuffer' })
                ),
              action.url
            )
          ).pipe(
            switchMap((catalogueIndex) =>
              combineLatest([
                of(catalogueIndex),
                combineLatest(
                  catalogueIndex.dataIndex.dataIndexEntries.dataIndexEntry
                    .filter((entry) => entry['@_dataType'] === 'gamesystem')
                    .map((entry) =>
                      loadGameSystem(
                        (url) =>
                          firstValueFrom(
                            this.http.get(url, { responseType: 'arraybuffer' })
                          ),
                        `${action.url.replace(
                          /\/[^/]+$/,
                          ''
                        )}/${encodeURIComponent(entry['@_filePath'])}`
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
                        `${action.url.replace(
                          /\/[^/]+$/,
                          ''
                        )}/${encodeURIComponent(entry['@_filePath'])}`
                      )
                    )
                ),
              ])
            )
          );
        }),
        tap(([index, gameSystems, catalogues]) =>
          console.log({ index, gameSystems, catalogues })
        )
      ),
    { dispatch: false }
  );
}
