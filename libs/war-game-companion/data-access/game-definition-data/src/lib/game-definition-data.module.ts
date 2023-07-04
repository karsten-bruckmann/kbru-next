import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DownloadGameDefinitionDataEffect } from './effects/download-game-definition-data.effect';
import { LoadFromStorageEffect } from './effects/load-from-storage.effect';
import { PersistToStorageEffect } from './effects/persist-to-storage.effect';
import { gameDefinitionDataCoreReducerRegistry } from './game-definition-data.core-reducer-registry';
import { gameDefinitionDataSlice } from './game-definition-data.slice';
import { DataIndex } from './models/data-index.model';
import { GameDefinitionDataState } from './models/game-definition-data-state.model';
import { dataIndexReducer } from './reducers/data-index.reducer';
import { gameDefinitionDataReducer } from './reducers/game-definition-data.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<GameDefinitionDataState | null>(
      gameDefinitionDataSlice,
      gameDefinitionDataReducer,
      {
        metaReducers: [gameDefinitionDataCoreReducerRegistry.metaReducer],
      }
    ),
    EffectsModule.forFeature([
      LoadFromStorageEffect,
      PersistToStorageEffect,
      DownloadGameDefinitionDataEffect,
    ]),
    StoreModule.forFeature<DataIndex>(
      `${gameDefinitionDataSlice}:data-index`,
      dataIndexReducer,
      {
        metaReducers: [
          createStorageSyncMetaReducer(`${gameDefinitionDataSlice}:data-index`),
        ],
      }
    ),
    EffectsModule.forFeature([
      LoadFromStorageEffect,
      PersistToStorageEffect,
      DownloadGameDefinitionDataEffect,
    ]),
  ],
})
export class GameDefinitionDataModule {}
