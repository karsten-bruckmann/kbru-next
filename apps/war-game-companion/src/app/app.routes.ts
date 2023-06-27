import { Route } from '@angular/router';
import { buildStartPageRoutes } from '@kbru/war-game-companion/features/build/main';
import { dataSourcesRoutes } from '@kbru/war-game-companion/features/data-sources';

import { AppNavigationComponent } from './app-navigation.component';

const buildRoutes = buildStartPageRoutes('build');

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppNavigationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: buildRoutes[0].path,
      },
      ...buildRoutes,
      ...dataSourcesRoutes('data-sources'),
    ],
  },
];
