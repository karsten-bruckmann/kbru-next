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
import { Md5 } from 'ts-md5';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';
import { GameDefinitionDataState } from '../models/game-definition-data-state.model';
import { CatalogueSchema, catalogueSchema } from '../schemas/catalogue.schema';
import {
  GameSystemSchema,
  gameSystemSchema,
} from '../schemas/game-system.schema';

@Injectable({ providedIn: 'root' })
export class StorageApiClient {
  public get(
    repositoryName: string
  ): Observable<GameDefinitionDataState | null> {
    return combineLatest([
      this.getGameSystem(repositoryName),
      this.getCatalogues(repositoryName),
    ]).pipe(
      map(([gameSystem, catalogues]) =>
        gameSystem
          ? {
              gameSystem,
              catalogues,
              repositoryName,
            }
          : null
      )
    );
  }

  public getGameSystem(
    repositoryName: string
  ): Observable<GameSystemSchema['gameSystem'] | null> {
    return from(this.gameSystemsDb(repositoryName)).pipe(
      switchMap((db: IDBPDatabase) => {
        return from(
          db.get(
            this.gameSystemKey(repositoryName),
            this.gameSystemKey(repositoryName)
          )
        ).pipe(
          map((value) => {
            try {
              return gameSystemSchema.parse({
                gameSystem: value,
              }).gameSystem;
            } catch (e) {
              return null;
            }
          })
        );
      })
    );
  }

  public getCatalogues(
    repositoryName: string
  ): Observable<Record<string, CatalogueSchema['catalogue']>> {
    return from(this.cataloguesDb(repositoryName)).pipe(
      switchMap((db: IDBPDatabase) => {
        return from(db.getAllKeys(this.cataloguesKey(repositoryName))).pipe(
          switchMap((keys) =>
            from(
              Promise.all(
                keys.map((key) =>
                  db.get(this.cataloguesKey(repositoryName), key)
                )
              )
            ).pipe(
              map((values) =>
                values.reduce<Record<string, CatalogueSchema['catalogue']>>(
                  (record, value, index) => ({
                    ...record,
                    [`${keys[index]}`]: catalogueSchema.parse({
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
    const gameSystemsKey = this.gameSystemKey(data.repositoryName);
    const cataloguesKey = this.cataloguesKey(data.repositoryName);
    const gameSystemsDb = await this.gameSystemsDb(data.repositoryName);
    const cataloguesDb = await this.cataloguesDb(data.repositoryName);

    const current = await firstValueFrom(this.get(data.repositoryName));

    await gameSystemsDb.put(gameSystemsKey, data.gameSystem, gameSystemsKey);

    if (current) {
      await Promise.all(
        Object.keys(data.catalogues).map((key) =>
          cataloguesDb.put(cataloguesKey, data.catalogues[key], key)
        )
      );
      await Promise.all(
        Object.keys(current.catalogues)
          .filter((key) => !data.catalogues[key])
          .map((key) => cataloguesDb.delete(cataloguesKey, key))
      );
    }
  }

  private gameSystemKey(repositoryName: string): string {
    return `${gameDefinitionDataSlice}/${Md5.hashStr(
      repositoryName
    )}/gameSystem`;
  }

  private gameSystemsDb(repositoryName: string): Promise<IDBPDatabase> {
    return openDB(this.gameSystemKey(repositoryName), 1, {
      upgrade: (db) => {
        db.createObjectStore(this.gameSystemKey(repositoryName));
      },
    });
  }

  private cataloguesKey(repositoryName: string): string {
    return `${gameDefinitionDataSlice}/${Md5.hashStr(
      repositoryName
    )}/catalogues`;
  }

  private cataloguesDb(repositoryName: string): Promise<IDBPDatabase> {
    return openDB(this.cataloguesKey(repositoryName), 1, {
      upgrade: (db) => {
        db.createObjectStore(this.cataloguesKey(repositoryName));
      },
    });
  }
}
