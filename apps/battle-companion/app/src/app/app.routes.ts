import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('battle-companion-pages-start/Component').then(
        (m) => m.BattleCompanionStartComponent
      ),
  },
];
