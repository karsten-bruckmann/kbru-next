import { Route } from '@angular/router';

import { AppNavigationComponent } from './app-navigation.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppNavigationComponent,
    children: [
      {
        path: 'build',
        loadChildren: () =>
          import('@kbru/war-game-companion/features/build').then(
            (m) => m.BuildModule
          ),
      },
      {
        path: 'data-sources',
        loadChildren: () =>
          import('@kbru/war-game-companion/features/data-sources').then(
            (m) => m.DataSourcesModule
          ),
      },
    ],
  },
];
