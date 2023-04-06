import { Route } from '@angular/router';
import { groupPageRoutes } from '@kbru/skat-list/features/group-page';
import { listPageRoutes } from '@kbru/skat-list/features/list-page';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@kbru/skat-list/features/start-page').then(
        (c) => c.StartPageComponent
      ),
  },
  ...groupPageRoutes,
  ...listPageRoutes,
];
