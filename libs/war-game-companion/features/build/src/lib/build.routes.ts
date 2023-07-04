import { Routes } from '@angular/router';

import { BuildComponent } from './build.component';
import { catalogueOpenGuard } from './guards/catalogue-open.guard';
import { ForceComponent } from './pages/force/force.component';
import { RootComponent } from './pages/forces/forces.component';
import { RostersComponent } from './pages/rosters/rosters.component';

export const buildRoutes: Routes = [
  {
    path: '',
    component: BuildComponent,
  },
  {
    path: ':catalogueId',
    canActivate: [catalogueOpenGuard],
    component: RostersComponent,
  },
  {
    path: ':catalogueId/:rosterId',
    canActivate: [catalogueOpenGuard],
    component: RootComponent,
  },
  {
    path: ':catalogueId/:rosterId/:forceIndex',
    canActivate: [catalogueOpenGuard],
    component: ForceComponent,
  },
];
