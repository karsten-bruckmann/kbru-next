import { Routes } from '@angular/router';
import { dataSourcesRoutes } from '@kbru/war-game-companion/features/build/data-sources';

export const buildStartPageRoutes = (buildPath: string): Routes => [
  {
    path: buildPath,
    loadComponent: () =>
      import('./build-main.component').then((m) => m.BuildStartPageComponent),
  },
  ...dataSourcesRoutes(`${buildPath}/data-sources`),
];
