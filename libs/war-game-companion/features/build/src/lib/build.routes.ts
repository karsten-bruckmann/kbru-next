import { Routes } from '@angular/router';

import { BuildComponent } from './build.component';
import { repositoryOpenGuard } from './guards/repository-open.guard';
import { ForceComponent } from './pages/force/force.component';
import { RepoComponent } from './pages/repo/repo.component';
import { RootComponent } from './pages/root/root.component';

export const buildRoutes: Routes = [
  {
    path: '',
    component: BuildComponent,
  },
  {
    path: ':repositoryName',
    canActivate: [repositoryOpenGuard],
    component: RepoComponent,
  },
  {
    path: ':repositoryName/:rosterId',
    canActivate: [repositoryOpenGuard],
    component: RootComponent,
  },
  {
    path: ':repositoryName/:rosterId/:forceIndex',
    canActivate: [repositoryOpenGuard],
    component: ForceComponent,
  },
];
