import { Routes } from '@angular/router';

export const buildStartPageRoutes = (buildPath: string): Routes => [
  {
    path: buildPath,
    loadComponent: () =>
      import('./build-main.component').then((m) => m.BuildStartPageComponent),
  },
];
