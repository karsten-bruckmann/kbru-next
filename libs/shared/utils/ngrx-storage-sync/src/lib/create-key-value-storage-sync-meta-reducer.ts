import { MetaReducer } from '@ngrx/store';

interface AllOptions {
  storage: Storage;
}

type Options = {
  [key in keyof AllOptions]?: AllOptions[key];
};

const getDefaultOptions = (): AllOptions => ({
  storage: sessionStorage,
});

export const createKeyValueStorageSyncMetaReducer =
  (
    storageKeyPrefix: string,
    options?: Options
  ): MetaReducer<Record<string, string>> =>
  (reducer) =>
  (state, action) => {
    const allOptions: AllOptions = {
      ...getDefaultOptions(),
      ...options,
    };

    let currentState = state;
    if (currentState === undefined) {
      currentState = {};
      for (let i = 0; i < allOptions.storage.length; i++) {
        const key = allOptions.storage.key(i);
        if (!key) {
          continue;
        }
        if (!key.match(new RegExp(`^${storageKeyPrefix}-`))) {
          continue;
        }

        currentState[key.replace(new RegExp(`^${storageKeyPrefix}-`), '')] =
          allOptions.storage.getItem(key) || '';
      }
    }

    const nextState = reducer(currentState, action);

    Object.keys(nextState).forEach((key) => {
      allOptions.storage.setItem(`${storageKeyPrefix}-${key}`, nextState[key]);
    });

    return nextState;
  };
