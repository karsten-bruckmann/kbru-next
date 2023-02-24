import { MetaReducer, Action } from '@ngrx/store';

export type CoreReducer<T> = (state: T, action: Action) => T;
type ReducerRegistry<T> = {
  add: (reducer: CoreReducer<T>, identifier: string) => void;
  metaReducer: MetaReducer<T>;
};

export const coreReducerRegistry = <T>(): ReducerRegistry<T> => {
  const reducers: Record<string, CoreReducer<T>> = {};
  const add = (reducer: CoreReducer<T>, identifier: string) => {
    reducers[identifier] = reducer;
  };
  const metaReducer: MetaReducer<T> = (reducer) => (state, action) => {
    let next = reducer(state, action);
    Object.values(reducers).forEach((coreReducer) => {
      next = coreReducer(next, action);
    });
    return next;
  };

  return {
    add,
    metaReducer,
  };
};
