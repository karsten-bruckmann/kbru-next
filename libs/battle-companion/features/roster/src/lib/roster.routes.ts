import { Route } from '@angular/router';
import { UnitRoutes } from '@kbru/battle-companion/features/unit';

import { RosterComponent } from './roster.component';

export const RosterRoutes: Route[] = [
  {
    path: ':id',
    component: RosterComponent,
  },
  {
    path: 'unit',
    loadChildren: () => UnitRoutes,
  },
];
