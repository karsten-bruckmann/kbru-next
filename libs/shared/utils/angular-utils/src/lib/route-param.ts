import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

export const routeParam = (
  paramName: string,
  activatedRoute: ActivatedRoute
): Observable<string> =>
  activatedRoute.paramMap.pipe(
    map((map) => map.get(paramName)),
    filter((value): value is string => !!value)
  );
