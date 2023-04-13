import { Route } from '@angular/router';

export const groupPageRoutes: Route[] = [
  {
    path: ':groupId',
    loadComponent: () =>
      import('./group-page.component').then((c) => c.GroupPageComponent),
  },
];
