import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@kbru/skat-list/features/start-page').then(
        (c) => c.StartPageComponent
      ),
  },
];
