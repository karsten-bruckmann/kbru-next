import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import {
  combineLatest,
  firstValueFrom,
  from,
  map,
  Observable,
  switchMap,
} from 'rxjs';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';
import { GameDefinitionDataState } from '../models/game-definition-data-state.model';
import { Catalogue, catalogueSchema } from '../schemas/catalogue.schema';
import { GameSystem, gameSystemSchema } from '../schemas/game-system.schema';

@Injectable({ providedIn: 'root' })
export class StorageApiClient {
  public get(): Observable<GameDefinitionDataState> {
    return combineLatest([this.getGameSystems(), this.getCatalogues()]).pipe(
      map(([gameSystems, catalogues]) => ({ gameSystems, catalogues }))
    );
  }

  public getGameSystems(): Observable<
    Record<string, GameSystem['gameSystem']>
  > {
    return from(this.gameSystemsDb).pipe(
      switchMap((db: IDBPDatabase) => {
        return from(db.getAllKeys(this.gameSystemsKey)).pipe(
          switchMap((keys) =>
            from(
              Promise.all(keys.map((key) => db.get(this.gameSystemsKey, key)))
            ).pipe(
              map((values) =>
                values.reduce<Record<string, GameSystem['gameSystem']>>(
                  (record, value, index) => ({
                    ...record,
                    [`${keys[index]}`]: gameSystemSchema.parse({
                      // '?xml': {},
                      gameSystem: value,
                    }).gameSystem,
                  }),
                  {}
                )
              )
            )
          )
        );
      })
    );
  }

  public getCatalogues(): Observable<Record<string, Catalogue['catalogue']>> {
    return from(this.cataloguesDb).pipe(
      switchMap((db: IDBPDatabase) => {
        return from(db.getAllKeys(this.cataloguesKey)).pipe(
          switchMap((keys) =>
            from(
              Promise.all(keys.map((key) => db.get(this.cataloguesKey, key)))
            ).pipe(
              map((values) =>
                values.reduce<Record<string, Catalogue['catalogue']>>(
                  (record, value, index) => ({
                    ...record,
                    [`${keys[index]}`]: catalogueSchema.parse({
                      // '?xml': {},
                      catalogue: value,
                    }).catalogue,
                  }),
                  {}
                )
              )
            )
          )
        );
      })
    );
  }

  public async set(data: GameDefinitionDataState): Promise<void> {
    const gameSystemsDb = await this.gameSystemsDb;
    const cataloguesDb = await this.cataloguesDb;

    const current = await firstValueFrom(this.get());

    await Promise.all(
      Object.keys(data.gameSystems).map((key) =>
        gameSystemsDb.put(this.gameSystemsKey, data.gameSystems[key], key)
      )
    );
    await Promise.all(
      Object.keys(current.gameSystems)
        .filter((key) => !data.gameSystems[key])
        .map((key) => gameSystemsDb.delete(this.gameSystemsKey, key))
    );

    await Promise.all(
      Object.keys(data.catalogues).map((key) =>
        cataloguesDb.put(this.cataloguesKey, data.catalogues[key], key)
      )
    );
    await Promise.all(
      Object.keys(current.catalogues)
        .filter((key) => !data.catalogues[key])
        .map((key) => cataloguesDb.delete(this.cataloguesKey, key))
    );
  }

  private get gameSystemsKey(): string {
    return `${gameDefinitionDataSlice}/gameSystems`;
  }

  private get gameSystemsDb(): Promise<IDBPDatabase> {
    return openDB(this.gameSystemsKey, 1, {
      upgrade: (db) => {
        db.createObjectStore(this.gameSystemsKey);
      },
    });
  }

  private get cataloguesKey(): string {
    return `${gameDefinitionDataSlice}/catalogues`;
  }

  private get cataloguesDb(): Promise<IDBPDatabase> {
    return openDB(this.cataloguesKey, 1, {
      upgrade: (db) => {
        db.createObjectStore(this.cataloguesKey);
      },
    });
  }
}
