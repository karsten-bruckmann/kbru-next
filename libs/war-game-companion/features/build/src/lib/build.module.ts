import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataSourceManagementModule } from '@kbru/war-game-companion/core/data-source-management';
import {
  CategoryNamePipe,
  ForceNamePipe,
  RosterManagementModule,
  SelectionNamePipe,
} from '@kbru/war-game-companion/core/roster-management';

import { BuildComponent } from './build.component';
import { buildRoutes } from './build.routes';
import { ForceComponent } from './pages/force/force.component';
import { RootComponent } from './pages/forces/forces.component';
import { RostersComponent } from './pages/rosters/rosters.component';
import { SelectionComponent } from './pages/selection/selection.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    DataSourceManagementModule.import(),
    RosterManagementModule.import(),
    RouterModule.forChild(buildRoutes),
    CategoryNamePipe,
    SelectionNamePipe,
    ForceNamePipe,
  ],
  declarations: [
    BuildComponent,
    RostersComponent,
    RootComponent,
    ForceComponent,
    SelectionComponent,
  ],
})
export class BuildModule {}
