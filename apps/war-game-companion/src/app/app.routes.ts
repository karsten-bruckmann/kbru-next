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
        path: 'play',
        loadChildren: () =>
          import('@kbru/war-game-companion/features/play').then(
            (m) => m.PlayModule
          ),
      },
      {
        path: 'learn',
        loadChildren: () =>
          import('@kbru/war-game-companion/features/learn').then(
            (m) => m.LearnModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@kbru/war-game-companion/features/settings').then(
            (m) => m.SettingsModule
          ),
      },
    ],
  },
];
