import { Route } from '@angular/router';

export const listPageRoutes: Route[] = [
  {
    path: ':groupId/:listId',
    loadComponent: () =>
      import('./list-page.component').then((c) => c.ListPageComponent),
  },
];
