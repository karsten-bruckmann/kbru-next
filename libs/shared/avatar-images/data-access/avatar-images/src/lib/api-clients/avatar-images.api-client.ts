import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { from, map, Observable, switchMap } from 'rxjs';

import { avatarImagesSlice } from '../avatar-images.slice';

@Injectable({ providedIn: 'root' })
export class AvatarImagesApiClient {
  public get(): Observable<Record<string, string>> {
    return from(this.db).pipe(
      switchMap((db: IDBPDatabase) => {
        return from(db.getAllKeys(avatarImagesSlice)).pipe(
          switchMap((keys) =>
            from(
              Promise.all(keys.map((key) => db.get(avatarImagesSlice, key)))
            ).pipe(
              map((values) =>
                values.reduce(
                  (record, value, index) => ({
                    ...record,
                    [`${keys[index]}`]: value,
                  }),
                  {}
                )
              )
            )
          )
        );
      })
    );
  }

  private get db(): Promise<IDBPDatabase> {
    return openDB(avatarImagesSlice, 1, {
      upgrade: (db) => {
        db.createObjectStore(avatarImagesSlice);
      },
    });
  }
}
