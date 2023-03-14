import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { routeParam } from './route-param';

export const routeParams = (
  paramNames: string[],
  activatedRoute: ActivatedRoute
): Observable<string[]> =>
  combineLatest(paramNames.map((name) => routeParam(name, activatedRoute)));
