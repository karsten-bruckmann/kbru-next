import { ModuleWithProviders, NgModule } from '@angular/core';
import { GameDefinitionDataModule } from '@kbru/war-game-companion/data-access/game-definition-data';
import {
  rostersCoreReducerRegistry,
  RostersModule,
} from '@kbru/war-game-companion/data-access/rosters';
import { EffectsModule } from '@ngrx/effects';

import { InvalidateCacheEffect } from './effects/invalidate-cache.effect';
import { rostersReducer } from './reducers/rosters.reducer';

@NgModule({
  imports: [
    GameDefinitionDataModule,
    RostersModule,
    EffectsModule.forFeature([InvalidateCacheEffect]),
  ],
})
export class RosterManagementModule {
  public static import(): ModuleWithProviders<RosterManagementModule> {
    rostersCoreReducerRegistry.add(rostersReducer, 'roster-management');
    return {
      ngModule: RosterManagementModule,
    };
  }
}
