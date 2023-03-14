import { MetaReducer } from '@ngrx/store';
import { openDB } from 'idb';

export const createIndexedDbPersistMetaReducer =
  <T>(
    databaseName: string,
    storageName: string,
    initializeActionType: string
  ): MetaReducer<Record<string, T>> =>
  (reducer) => {
    let initialized = false;
    return (state, action) => {
      const nextState = reducer(state, action);

      if (action.type === initializeActionType) {
        initialized = true;
      }

      if (!initialized) {
        return nextState;
      }

      openDB(databaseName, 1, {
        upgrade: (db) => {
          db.createObjectStore(storageName);
        },
      })
        .then((db) => {
          db.clear(storageName);
          return db;
        })
        .then((db) => {
          Object.keys(nextState).forEach((key) => {
            db.put(storageName, nextState[key], key);
          });
        });

      return nextState;
    };
  };
