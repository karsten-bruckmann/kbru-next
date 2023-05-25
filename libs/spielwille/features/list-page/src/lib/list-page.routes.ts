import { inject } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { routeParam } from '@kbru/shared/utils/angular-utils';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { List, listSelector } from '@kbru/spielwille/core/skat-game-management';
import { Store } from '@ngrx/store';
import { Observable, shareReplay, switchMap } from 'rxjs';

export function getList$(
  activatedRoute = inject(ActivatedRoute),
  store$ = inject(Store)
): Observable<List> {
  return routeParam('listId', activatedRoute).pipe(
    switchMap((listId) => store$.select(listSelector(listId))),
    filterNullish(),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
}

export const listPageRoutes: Route[] = [
  {
    path: ':groupId/:listId',
    loadComponent: () =>
      import('./list-page.component').then((c) => c.ListPageComponent),
  },
];
