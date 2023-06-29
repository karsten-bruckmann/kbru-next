import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DownloadGameDefinitionDataEffect } from './effects/download-game-definition-data.effect';
import { LoadFromStorageEffect } from './effects/load-from-storage.effect';
import { PersistToStorageEffect } from './effects/persist-to-storage.effect';
import { gameDefinitionDataCoreReducerRegistry } from './game-definition-data.core-reducer-registry';
import { gameDefinitionDataSlice } from './game-definition-data.slice';
import { GameDefinitionDataState } from './models/game-definition-data-state.model';
import { gameDefinitionDataReducer } from './reducers/game-definition-data.reducer';
import { repositoriesReducer } from './reducers/repositories.reducer';

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
    StoreModule.forFeature<string[]>(
      `${gameDefinitionDataSlice}/repositories`,
      repositoriesReducer,
      {
        metaReducers: [
          createStorageSyncMetaReducer(
            `${gameDefinitionDataSlice}/repositories`
          ),
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
