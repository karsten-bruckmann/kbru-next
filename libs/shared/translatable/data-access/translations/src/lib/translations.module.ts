import { NgModule } from '@angular/core';
import { createKeyValueStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { StoreModule } from '@ngrx/store';

import { TranslationsState } from './models/translations-state.model';
import { translationsReducer } from './reducers/translations.reducer';
import { translationsCoreReducerRegistry } from './translations.core-reducer-registry';
import { translationsSlice } from './translations.slice';

@NgModule({
  imports: [
    StoreModule.forFeature<TranslationsState>(
      translationsSlice,
      translationsReducer,
      {
        metaReducers: [
          translationsCoreReducerRegistry.metaReducer,
          createKeyValueStorageSyncMetaReducer('translations-v2-de', {
            storage: localStorage,
          }),
        ],
      }
    ),
  ],
})
export class TranslationsModule {}
