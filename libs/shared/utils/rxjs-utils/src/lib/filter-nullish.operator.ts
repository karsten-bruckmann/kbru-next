import { filter, Observable, OperatorFunction } from 'rxjs';

export const filterNullish =
  <T>(): OperatorFunction<T | undefined | null, T> =>
  <T>(input$: Observable<T | null | undefined>): Observable<T> =>
    input$.pipe(filter((v): v is T => v !== null || v === undefined));
