import { Route } from '@angular/router';
import { groupPageRoutes } from '@kbru/spielwille/features/group-page';
import { listPageRoutes } from '@kbru/spielwille/features/list-page';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@kbru/spielwille/features/start-page').then(
        (c) => c.StartPageComponent
      ),
  },
  ...groupPageRoutes,
  ...listPageRoutes,
];
