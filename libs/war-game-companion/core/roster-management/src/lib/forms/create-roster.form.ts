import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, of, ReplaySubject, switchMap } from 'rxjs';

import { catalogueOptions } from '../selectors/catalogue-options.selector';
import { forceOptions } from '../selectors/force-options.selector';
import { gameSystemOptions } from '../selectors/game-system-options.selector';

@Injectable({
  providedIn: 'root',
  useFactory: (store$: Store) => new CreateRosterForm(store$),
  deps: [Store],
})
export class CreateRosterForm extends FormGroup<{
  name: FormControl<string | null>;
  gameSystemId: GameSystemIdControl;
  catalogueId: CatalogueIdControl;
  forceId: ForceIdControl;
}> {
  constructor(private store$: Store) {
    super(
      {
        name: new FormControl(''),
        gameSystemId: new GameSystemIdControl(store$),
        catalogueId: new CatalogueIdControl(store$),
        forceId: new ForceIdControl(store$),
      },
      {
        asyncValidators: [
          async () => {
            if (
              !this.value.name ||
              !this.value.gameSystemId ||
              !this.value.catalogueId ||
              !this.value.forceId
            ) {
              return { invalid: true };
            }

            return null;
          },
        ],
      }
    );
  }
}

export class GameSystemIdControl extends FormControl<string | null> {
  constructor(private store$: Store) {
    super('');
  }

  public readonly options$ = this.store$.select(gameSystemOptions);
}

export class ForceIdControl extends FormControl<string | null> {
  constructor(private store$: Store) {
    super(null);
  }

  private readonly gameSystemId$ = new ReplaySubject<string | null>(1);
  private readonly catalogueId$ = new ReplaySubject<string | null>(1);

  public readonly options$ = combineLatest([
    this.gameSystemId$,
    this.catalogueId$,
  ]).pipe(
    switchMap(([gameSystemId, catalogueId]) =>
      !!catalogueId && !!gameSystemId
        ? this.store$.select(forceOptions(gameSystemId, catalogueId))
        : of([])
    )
  );

  public readonly effects = [
    (form: CreateRosterForm) =>
      form.controls.gameSystemId.valueChanges.pipe(
        map((id) => {
          this.gameSystemId$.next(id);
        })
      ),
    (form: CreateRosterForm) =>
      form.controls.catalogueId.valueChanges.pipe(
        map((id) => {
          this.catalogueId$.next(id);
        })
      ),
    () => {
      this.disable();
      return this.options$.pipe(
        map((options) => {
          if (options.length === 0) {
            this.disable();
            if (this.value) {
              this.setValue(null);
            }
            return;
          }

          this.enable();
        })
      );
    },
  ];
}

export class CatalogueIdControl extends FormControl<string | null> {
  constructor(private store$: Store) {
    super(null);
  }

  private readonly catalogueId$ = new ReplaySubject<string | null>(1);

  public readonly options$ = this.catalogueId$.pipe(
    switchMap((catalogueId) =>
      catalogueId ? this.store$.select(catalogueOptions(catalogueId)) : of([])
    )
  );

  public readonly effects = [
    (form: CreateRosterForm) =>
      form.controls.gameSystemId.valueChanges.pipe(
        map((id) => {
          this.catalogueId$.next(id);
        })
      ),
    () => {
      this.disable();
      return this.options$.pipe(
        map((options) => {
          if (options.length === 0) {
            this.disable();
            if (this.value) {
              this.setValue(null);
            }
            return;
          }

          this.enable();
        })
      );
    },
  ];
}
