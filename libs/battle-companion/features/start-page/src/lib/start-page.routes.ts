import { Route } from '@angular/router';

import { StartPageComponent } from './start-page.component';

export const StartPageRoutes: Route[] = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: 'roster',
    loadChildren: () =>
      import('@kbru/battle-companion/features/roster').then(
        (m) => m.RosterRoutes
      ),
  },
];
