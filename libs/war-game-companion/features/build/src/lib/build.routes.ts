import { Routes } from '@angular/router';

export const buildStartPageRoutes = (buildPath: string): Routes => [
  {
    path: buildPath,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./build.component').then((m) => m.BuildStartPageComponent),
      },
      {
        path: ':rosterId',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/root/root.component').then(
                (m) => m.RootComponent
              ),
          },
          {
            path: ':forceIndex',
            loadComponent: () =>
              import('./pages/force/force.component').then(
                (m) => m.ForceComponent
              ),
          },
        ],
      },
    ],
  },
];
