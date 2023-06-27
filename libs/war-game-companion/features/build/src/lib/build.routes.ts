import { Routes } from '@angular/router';

export const buildStartPageRoutes = (buildPath: string): Routes => [
  {
    path: buildPath,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main',
      },
      {
        path: 'main',
        loadComponent: () =>
          import('./build.component').then((m) => m.BuildStartPageComponent),
      },
      {
        path: 'root/:rosterId',
        loadComponent: () =>
          import('./pages/root/root.component').then((m) => m.RootComponent),
      },
    ],
  },
];
