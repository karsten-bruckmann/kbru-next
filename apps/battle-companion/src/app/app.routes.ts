import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@kbru/battle-companion/features/start-page').then(
        (m) => m.StartPageComponent
      ),
  },
];
