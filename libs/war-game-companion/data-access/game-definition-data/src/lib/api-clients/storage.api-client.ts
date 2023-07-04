import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';
import { CatalogueSchema, catalogueSchema } from '../schemas/catalogue.schema';
import {
  GameSystemSchema,
  gameSystemSchema,
} from '../schemas/game-system.schema';

const GAME_SYSTEMS_STORE = 'game-systems';
const CATALOGUES_STORE = 'catalogues';

@Injectable({ providedIn: 'root' })
export class StorageApiClient {
  public async persistCatalogue(catalogue: CatalogueSchema) {
    const db = await this.db;
    await db.put(CATALOGUES_STORE, catalogue, catalogue.catalogue['@_id']);
  }

  public async persistGameSystem(gameSystem: GameSystemSchema) {
    const db = await this.db;
    await db.put(GAME_SYSTEMS_STORE, gameSystem, gameSystem.gameSystem['@_id']);
  }

  public async getCatalogue(catalogueId: string): Promise<CatalogueSchema> {
    const db = await this.db;
    const data = await db.get(CATALOGUES_STORE, catalogueId);
    return catalogueSchema.parse(data);
  }

  public async getGameSystem(gameSystemId: string): Promise<GameSystemSchema> {
    const db = await this.db;
    const data = await db.get(GAME_SYSTEMS_STORE, gameSystemId);
    return gameSystemSchema.parse(data);
  }

  private get db(): Promise<IDBPDatabase> {
    return openDB(gameDefinitionDataSlice, 1, {
      upgrade: (db) => {
        db.createObjectStore('game-systems');
        db.createObjectStore('catalogues');
      },
    });
  }
}
