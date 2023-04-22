import {
  distinctUntilChanged,
  MonoTypeOperatorFunction,
  Observable,
} from 'rxjs';

export const distinctUntilContentChanged =
  <T>(): MonoTypeOperatorFunction<T> =>
  <T>(input$: Observable<T>): Observable<T> =>
    input$.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
