import { Action } from '@ngrx/store';

export type CoreReducer<T> = (state: T, action: Action) => T;
