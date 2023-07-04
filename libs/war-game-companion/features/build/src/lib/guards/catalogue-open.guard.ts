import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RosterEditingService } from '@kbru/war-game-companion/core/roster-management';
import { filter, first, map, Observable, of, switchMap } from 'rxjs';

export const catalogueOpenGuard: CanActivateFn = (
  route
): Observable<boolean> => {
  const rosterEditingService = inject(RosterEditingService);
  return rosterEditingService.catalogueId$.pipe(
    switchMap((catalogueId) => {
      const routeCatalogueId = route.paramMap.get('catalogueId');
      if (!routeCatalogueId) {
        return of(false);
      }
      if (catalogueId === routeCatalogueId) {
        return of(true);
      }

      rosterEditingService.openCatalogue(routeCatalogueId);

      return rosterEditingService.catalogueId$.pipe(
        filter((catalogueId) => catalogueId === routeCatalogueId),
        map(() => true),
        first()
      );
    })
  );
};
