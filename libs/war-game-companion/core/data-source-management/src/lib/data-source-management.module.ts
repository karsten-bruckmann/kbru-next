import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { LoadDataSourceFromUrlEffect } from './effects/load-data-source-from-url.effect';

@NgModule({
  imports: [EffectsModule.forFeature([LoadDataSourceFromUrlEffect])],
})
export class DataSourceManagementModule {}
