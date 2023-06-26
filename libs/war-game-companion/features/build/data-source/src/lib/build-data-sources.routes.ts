import { Routes } from '@angular/router';

export const buildDataSourcesRoutes = (dataSourcesPath: string): Routes => [
  {
    path: dataSourcesPath,
    loadComponent: () =>
      import('./build-data-sources.component').then(
        (m) => m.BuildDataSourcesComponent
      ),
  },
];
