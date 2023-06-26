import { Routes } from '@angular/router';
import { buildDataSourcesRoutes } from '@kbru/war-game-companion/features/build/data-source';

export const buildStartPageRoutes = (buildPath: string): Routes => [
  {
    path: buildPath,
    loadComponent: () =>
      import('./build-main.component').then((m) => m.BuildStartPageComponent),
  },
  ...buildDataSourcesRoutes(`${buildPath}/data-sources`),
];
