import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RosterManagementModule } from '@kbru/war-game-companion/core/roster-management';

import { BuildComponent } from './build.component';
import { buildRoutes } from './build.routes';
import { ForceComponent } from './pages/force/force.component';
import { RootComponent } from './pages/forces/forces.component';
import { RostersComponent } from './pages/rosters/rosters.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    RosterManagementModule.import(),
    RouterModule.forChild(buildRoutes),
  ],
  declarations: [
    BuildComponent,
    RostersComponent,
    RootComponent,
    ForceComponent,
  ],
})
export class BuildModule {}
