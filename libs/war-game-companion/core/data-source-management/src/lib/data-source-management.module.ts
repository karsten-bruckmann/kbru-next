import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  GameDefinitionDataModule,
  gameDefinitionDataRefreshActionRegistry,
} from '@kbru/war-game-companion/data-access/game-definition-data';

import { loadGameDefinitionFormSubmittedAction } from './actions/load-game-definition-form-submitted.action';

@NgModule({
  imports: [GameDefinitionDataModule],
})
export class DataSourceManagementModule {
  public static import(): ModuleWithProviders<DataSourceManagementModule> {
    gameDefinitionDataRefreshActionRegistry.add(
      loadGameDefinitionFormSubmittedAction
    );
    return {
      ngModule: DataSourceManagementModule,
    };
  }
}
