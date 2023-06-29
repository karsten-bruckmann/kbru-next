import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FileInputComponent } from '@kbru/shared/ui/ionic-file-input';
import { DataSourceManagementModule } from '@kbru/war-game-companion/core/data-source-management';

import { DataSourcesComponent } from './data-sources.component';
import { dataSourcesRoutes } from './data-sources.routes';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FileInputComponent,
    DataSourceManagementModule.import(),
    RouterModule.forChild(dataSourcesRoutes),
  ],
  declarations: [DataSourcesComponent],
})
export class DataSourcesModule {}
