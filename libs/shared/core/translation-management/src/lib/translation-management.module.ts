import { NgModule } from '@angular/core';
import {
  translationsCoreReducerRegistry,
  TranslationsModule,
} from '@kbru/shared/data-access/translations';

import { translationsReducer } from './reducers/translations.reducer';

@NgModule({
  imports: [TranslationsModule],
})
export class TranslationManagementModule {
  constructor() {
    translationsCoreReducerRegistry.add(
      translationsReducer,
      'translation-management'
    );
  }
}
