import { MetaReducer } from '@ngrx/store';

import { MinimalStorage } from './models/minimal-storage.model';

interface AllOptions<T> {
  storage: MinimalStorage;
  serialize: (state: T) => string;
  parse: (serialized: string | null) => T | undefined;
}

type Options<T> = {
  [key in keyof AllOptions<T>]?: AllOptions<T>[key];
};

const getDefaultOptions = <T>(): AllOptions<T> => ({
  storage: sessionStorage,
  serialize: (state) => JSON.stringify(state),
  parse: (serialized) => {
    if (!serialized) {
      return undefined;
    }
    try {
      return JSON.parse(serialized);
    } catch (e) {
      return undefined;
    }
  },
});

export const createStorageSyncMetaReducer =
  <T>(storageKey: string, options?: Options<T>): MetaReducer<T> =>
  (reducer) =>
  (state, action) => {
    const allOptions: AllOptions<T> = {
      ...getDefaultOptions(),
      ...options,
    };

    let currentState = state;
    if (currentState === undefined) {
      currentState = allOptions.parse(allOptions.storage.getItem(storageKey));
    }

    const nextState = reducer(currentState, action);

    allOptions.storage.setItem(storageKey, allOptions.serialize(nextState));
    return nextState;
  };
