import { Route } from '@angular/router';

import { UnitComponent } from './unit.component';

export const UnitRoutes: Route[] = [
  {
    path: ':roster-id/:detachment-index/:unit-id',
    component: UnitComponent,
  },
];
