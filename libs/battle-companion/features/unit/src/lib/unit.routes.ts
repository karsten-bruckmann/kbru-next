import { Route } from '@angular/router';

import { UnitComponent } from './unit.component';

export const UnitRoutes: Route[] = [
  {
    path: ':id',
    component: UnitComponent,
  },
];
