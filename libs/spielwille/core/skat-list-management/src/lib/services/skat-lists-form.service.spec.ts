import { Injector } from '@angular/core';
import { potentiallyStableFormTestHelper } from '@kbru/shared/utils/effect-aware-forms';
import { groupsSlice, GroupsState } from '@kbru/spielwille/data-access/groups';
import {
  playersSlice,
  PlayersState,
} from '@kbru/spielwille/data-access/players';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jest-marbles';
import { firstValueFrom, map } from 'rxjs';

import { SkatListFormService } from './skat-list-form.service';

describe('SkatListFormService::getForm$() - Integration Tests for created form', () => {
  let service: SkatListFormService;
  let store$: MockStore;

  const initialState: {
    [groupsSlice]: GroupsState;
    [playersSlice]: PlayersState;
  } = {
    [groupsSlice]: {
      'group-with-three-players': {
        name: 'Group With Three Players',
        created: '2023-01-01',
        playerIds: ['player-a', 'player-b', 'player-c'],
        listIds: [],
      },
    },
    [playersSlice]: {
      'player-a': {
        name: 'Player A',
      },
      'player-b': {
        name: 'Player B',
      },
      'player-c': {
        name: 'Player C',
      },
    },
  };

  beforeEach(() => {
    const injector = Injector.create({
      providers: [provideMockStore({ initialState })],
    });
    store$ = injector.get(MockStore);
    service = new SkatListFormService(store$);
  });

  test("getForm$() emits no value when group doesn't exist", () => {
    expect(
      service.getForm$('non-existing-list').pipe(map((f) => f.value))
    ).toBeObservable(cold(''));
  });

  test('getForm$() emits a form when group exist', async () => {
    const form = await firstValueFrom(
      potentiallyStableFormTestHelper(
        service.getForm$('group-with-three-players')
      )
    );
    expect(form).toBeTruthy();
  });

  test('possibleValues of playerIds control contains all group players', async () => {
    const form = await firstValueFrom(
      potentiallyStableFormTestHelper(
        service.getForm$('group-with-three-players')
      )
    );
    expect(form.controls.playerIds.possibleValues).toEqual([
      'player-a',
      'player-b',
      'player-c',
    ]);
  });

  test('playerId control is enabled initially', async () => {
    const form = await firstValueFrom(
      potentiallyStableFormTestHelper(
        service.getForm$('group-with-three-players')
      )
    );
    expect(form.controls.playerIds.enabled).toEqual(true);
  });

  describe('spritzen', () => {
    test('kontra control is enabled initially', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(
          service.getForm$('group-with-three-players')
        )
      );
      expect(form.controls.kontra.enabled).toEqual(true);
    });

    test('re and hirsch controls are disabled (and false), when kontra is false', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(
          service.getForm$('group-with-three-players'),
          {
            setupTest: (form) => {
              form.controls.kontra.setValue(false);
            },
          }
        )
      );
      expect(form.controls.re.disabled).toEqual(true);
      expect(form.controls.hirsch.disabled).toEqual(true);
      expect(form.controls.re.getRawValue()).toEqual(false);
      expect(form.controls.hirsch.getRawValue()).toEqual(false);
    });

    test('re control is enabled, when kontra is true', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(
          service.getForm$('group-with-three-players'),
          {
            setupTest: (form) => {
              form.controls.kontra.setValue(true);
            },
          }
        )
      );
      expect(form.controls.re.enabled).toEqual(true);
    });

    test('hirsch control is disabled (and false), when re is false', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(
          service.getForm$('group-with-three-players'),
          {
            setupTest: (form) => {
              form.controls.kontra.setValue(true);
              form.controls.re.setValue(false);
            },
          }
        )
      );
      expect(form.controls.hirsch.disabled).toEqual(true);
      expect(form.controls.hirsch.getRawValue()).toEqual(false);
    });

    test('hirsch control is enabled, when re is true', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(
          service.getForm$('group-with-three-players'),
          {
            setupTest: (form) => {
              form.controls.kontra.setValue(true);
              form.controls.re.setValue(true);
            },
          }
        )
      );
      expect(form.controls.hirsch.enabled).toEqual(true);
    });
  });

  describe('ramsch', () => {
    test('ramsch control is enabled initially', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(
          service.getForm$('group-with-three-players')
        )
      );
      expect(form.controls.ramsch.enabled).toEqual(true);
    });

    test('ramschSchieben and ramschJungfrau controls are disabled, when ramsch is false', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(
          service.getForm$('group-with-three-players'),
          {
            setupTest: (form) => {
              form.controls.ramsch.setValue(false);
            },
          }
        )
      );
      expect(form.controls.ramschSchieben.disabled).toEqual(true);
      expect(form.controls.ramschJungfrau.disabled).toEqual(true);
    });

    test('ramschSchieben and ramschJungfrau controls are enabled, when ramsch is true', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(
          service.getForm$('group-with-three-players'),
          {
            setupTest: (form) => {
              form.controls.ramsch.setValue(true);
            },
          }
        )
      );
      expect(form.controls.ramschSchieben.enabled).toEqual(true);
      expect(form.controls.ramschJungfrau.enabled).toEqual(true);
    });
  });

  describe('bock sets', () => {
    test('bockSets control is enabled initially', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(
          service.getForm$('group-with-three-players')
        )
      );
      expect(form.controls.bockSets.enabled).toEqual(true);
    });

    describe('auto bock sets', () => {
      test('autoBockKontraLost control is disabled, when bockSets is true but kontra is false', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(
            service.getForm$('group-with-three-players'),
            {
              setupTest: (form) => {
                form.controls.bockSets.setValue(true);
                form.controls.kontra.setValue(false);
              },
            }
          )
        );
        expect(form.controls.autoBockKontraLost.disabled).toEqual(true);
      });

      test('autoBockKontraLost control is enabled, when bockSets is true and kontra is false', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(
            service.getForm$('group-with-three-players'),
            {
              setupTest: (form) => {
                form.controls.bockSets.setValue(true);
                form.controls.kontra.setValue(true);
              },
            }
          )
        );
        expect(form.controls.autoBockKontraLost.enabled).toEqual(true);
      });

      test('autoBockKontraRe control is disabled, when bockSets is true but re is false', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(
            service.getForm$('group-with-three-players'),
            {
              setupTest: (form) => {
                form.controls.bockSets.setValue(true);
                form.controls.kontra.setValue(true);
                form.controls.re.setValue(false);
              },
            }
          )
        );
        expect(form.controls.autoBockKontraRe.disabled).toEqual(true);
      });

      test('autoBockKontraRe control is disabled, when bockSets is true and re is true', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(
            service.getForm$('group-with-three-players'),
            {
              setupTest: (form) => {
                form.controls.bockSets.setValue(true);
                form.controls.kontra.setValue(true);
                form.controls.re.setValue(true);
              },
            }
          )
        );
        expect(form.controls.autoBockKontraRe.enabled).toEqual(true);
      });
    });

    describe('ramsch sets', () => {
      test('ramschSets control is disabled, when bockSets is false', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(
            service.getForm$('group-with-three-players'),
            {
              setupTest: (form) => {
                form.controls.bockSets.setValue(false);
              },
            }
          )
        );
        expect(form.controls.ramschSets.disabled).toEqual(true);
      });

      test('ramschSets control is enabled, when bockSets is true', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(
            service.getForm$('group-with-three-players'),
            {
              setupTest: (form) => {
                form.controls.bockSets.setValue(true);
              },
            }
          )
        );
        expect(form.controls.ramschSets.enabled).toEqual(true);
      });

      test('ramschSetsSchieben and ramschSetsJungfrau controls are disabled, when ramschSets is false', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(
            service.getForm$('group-with-three-players'),
            {
              setupTest: (form) => {
                form.controls.bockSets.setValue(true);
                form.controls.ramschSets.setValue(false);
              },
            }
          )
        );
        expect(form.controls.ramschSetsSchieben.disabled).toEqual(true);
        expect(form.controls.ramschSetsJungfrau.disabled).toEqual(true);
      });

      test('ramschSetsSchieben and ramschSetsJungfrau controls are enabled, when ramschSets is true', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(
            service.getForm$('group-with-three-players'),
            {
              setupTest: (form) => {
                form.controls.bockSets.setValue(true);
                form.controls.ramschSets.setValue(true);
              },
            }
          )
        );
        expect(form.controls.ramschSetsSchieben.enabled).toEqual(true);
        expect(form.controls.ramschSetsJungfrau.enabled).toEqual(true);
      });
    });
  });
});
