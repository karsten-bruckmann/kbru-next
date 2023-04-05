import { map, Observable, OperatorFunction } from 'rxjs';

export const toVoid =
  <T>(): OperatorFunction<T, void> =>
  <T>(input$: Observable<T>): Observable<void> =>
    input$.pipe(
      map(() => {
        return;
      })
    );
