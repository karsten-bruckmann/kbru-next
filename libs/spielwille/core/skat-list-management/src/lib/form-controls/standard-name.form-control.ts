import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish, toVoid } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import { of, startWith, switchMap, tap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { listStandardSelector } from '../selectors/list-standard.selector';
import { listStandardNamesSelector } from '../selectors/list-standard-names.selector';

@Injectable({ providedIn: 'root' })
export class StandardNameFormControl extends FormControl<string | null> {
  constructor(private store$: Store) {
    super('', (control) => {
      if (!control.value) {
        return null;
      }
      if (typeof control.value !== 'string') {
        return {
          type: true,
        };
      }
      if (control.value.length < 2 || control.value.length > 50) {
        return {
          length: true,
        };
      }
      if (!control.value.match(/^[ 0-9a-zA-Z_.-]*$/)) {
        return {
          characters: true,
        };
      }

      return null;
    });
  }

  public existingNames: string[] = [];

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return form.controls.groupId.valueChanges.pipe(
        startWith(form.controls.groupId.value),
        switchMap((groupId) => {
          if (!groupId) {
            return of([]);
          }
          return this.store$.select(listStandardNamesSelector(groupId)).pipe(
            tap((names) => {
              this.existingNames = names;
            }),
            switchMap(() => form.controls.standardName.valueChanges),
            filterNullish(),
            switchMap((standard) =>
              this.store$.select(listStandardSelector(groupId, standard))
            ),
            tap((standard) => {
              if (standard) {
                form.patchValue({
                  groupId: groupId,
                  addOn: standard.addOn,
                  bockSets: !!standard.bockSets,
                  autoBockKontraLost: standard.bockSets
                    ? standard.bockSets.kontraLost
                    : false,
                  autoBockKontraRe: standard.bockSets
                    ? standard.bockSets.kontraRe
                    : false,
                  ramschSets: standard.bockSets
                    ? !!standard.bockSets.ramsch
                    : false,
                  ramschSetsJungfrau:
                    standard.bockSets && standard.bockSets.ramsch
                      ? standard.bockSets.ramsch.jungfrau
                      : false,
                  ramschSetsSchieben:
                    standard.bockSets && standard.bockSets.ramsch
                      ? standard.bockSets.ramsch.geschoben
                      : false,
                  calculationType: standard.calculationType,
                  centPerPoint: standard.centPerPoint,
                  kontra:
                    standard.maxSpritze === 'kontra' ||
                    standard.maxSpritze === 're' ||
                    standard.maxSpritze === 'hirsch',
                  re:
                    standard.maxSpritze === 're' ||
                    standard.maxSpritze === 'hirsch',
                  hirsch: standard.maxSpritze === 'hirsch',
                  maxSets: standard.maxSets,
                  playerIds: [],
                  ramsch: !!standard.ramsch,
                  ramschJungfrau: standard.ramsch
                    ? standard.ramsch.jungfrau
                    : false,
                  ramschSchieben: standard.ramsch
                    ? standard.ramsch.geschoben
                    : false,
                  saechsischeSpitze: standard.saechsischeSpitze,
                  spitzen: standard.spitzen,
                  thresholdAnnouncementWithoutHand:
                    standard.thresholdAnnouncementWithoutHand,
                });
              }
            })
          );
        }),
        toVoid()
      );
    };
  }
}
