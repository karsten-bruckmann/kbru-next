import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RosterEditingService } from '@kbru/war-game-companion/core/roster-management';
import { filter, first, map, Observable, of, switchMap, tap } from 'rxjs';

export const repositoryOpenGuard: CanActivateFn = (
  route
): Observable<boolean> => {
  const rosterEditingService = inject(RosterEditingService);
  return rosterEditingService.repositoryName$.pipe(
    switchMap((repositoryName) => {
      const routeRepositoryName = route.paramMap.get('repositoryName');
      if (!routeRepositoryName) {
        return of(false);
      }
      if (repositoryName === route.paramMap.get('repositoryName')) {
        return of(true);
      }

      rosterEditingService.openRepository(routeRepositoryName);

      return rosterEditingService.repositoryName$.pipe(
        filter((repositoryName) => repositoryName === routeRepositoryName),
        map(() => true),
        tap(console.log),
        first()
      );
    })
  );
};
