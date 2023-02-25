import {
  ActionCreator,
  ActionReducer,
  createReducer,
  ReducerTypes,
} from '@ngrx/store';

import { CoreReducer } from './core-reducer.type';

export const createCoreReducer = <T>(
  ...ons: ReducerTypes<T, readonly ActionCreator[]>[]
): CoreReducer<T> =>
  createReducer<T | undefined>(
    undefined,
    ...(ons as ReducerTypes<T | undefined, readonly ActionCreator[]>[])
  ) as ActionReducer<T>;
