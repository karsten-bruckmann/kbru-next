import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@kbru/battle-companion/features/start-page').then(
        (m) => m.StartPageRoutes
      ),
  },
];
