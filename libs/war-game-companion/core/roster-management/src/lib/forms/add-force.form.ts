import { FormControl, FormGroup } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { map, of, ReplaySubject, startWith, switchMap } from 'rxjs';

import { availableCataloguesSelector } from '../selectors/available-catalogues.selector';
import { availableForcesSelector } from '../selectors/available-forces.selector';

export class AddForceForm extends FormGroup<{
  catalogueId: CatalogueIdControl;
  forceId: ForceIdControl;
}> {
  constructor(store$: Store) {
    super(
      {
        catalogueId: new CatalogueIdControl(store$),
        forceId: new ForceIdControl(store$),
      },
      {
        asyncValidators: [
          async (form) => {
            if (!form.value.forceId) {
              return { invalid: true };
            }

            return null;
          },
        ],
      }
    );
  }
}

export class CatalogueIdControl extends FormControl<string | null> {
  constructor(private store$: Store) {
    super(null);
  }

  public readonly options$ = this.store$.select(availableCataloguesSelector);
}

export class ForceIdControl extends FormControl<string | null> {
  constructor(private store$: Store) {
    super(null);
  }

  private readonly catalogueId$ = new ReplaySubject<string | null>(0);

  public readonly options$ = this.catalogueId$.pipe(
    switchMap((catalogueId) =>
      !catalogueId
        ? of([])
        : this.store$.select(availableForcesSelector(catalogueId))
    )
  );

  public readonly effects: FormEffect<AddForceForm>[] = [
    (form) =>
      form.controls.catalogueId.valueChanges.pipe(
        startWith(form.controls.catalogueId.value),
        map((catalogueId) => {
          this.catalogueId$.next(catalogueId);
        })
      ),
    () =>
      this.options$.pipe(
        map((options) => {
          if (options.length === 0) {
            this.setValue(null);
            this.disable();
          } else {
            this.enable();
          }
        })
      ),
  ];
}
