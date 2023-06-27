import { Routes } from '@angular/router';

export const dataSourcesRoutes = (dataSourcesPath: string): Routes => [
  {
    path: dataSourcesPath,
    loadComponent: () =>
      import('./data-sources.component').then((m) => m.DataSourcesComponent),
  },
];
