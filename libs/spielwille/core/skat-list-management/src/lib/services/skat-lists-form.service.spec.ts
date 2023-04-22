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

  it("emits no value when group doesn't exist", () => {
    expect(
      service.getForm$('non-existing-list').pipe(map((f) => f.value))
    ).toBeObservable(cold(''));
  });

  it('emits a form when group exist', async () => {
    const form = await firstValueFrom(
      potentiallyStableFormTestHelper(
        service.getForm$('group-with-three-players')
      )
    );
    expect(form).toBeTruthy();
  });

  it('has all group player available', async () => {
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

  it('has playerId control enabled initially', async () => {
    const form = await firstValueFrom(
      potentiallyStableFormTestHelper(
        service.getForm$('group-with-three-players')
      )
    );
    expect(form.controls.playerIds.enabled).toEqual(true);
  });

  it('has kontra control enabled initially', async () => {
    const form = await firstValueFrom(
      potentiallyStableFormTestHelper(
        service.getForm$('group-with-three-players')
      )
    );
    expect(form.controls.kontra.enabled).toEqual(true);
  });

  it('has re and hirsch controls disabled, when kontra is false', async () => {
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
  });

  it('has re control enabled, when kontra is true', async () => {
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

  it('has hirsch control disabled, when re is false', async () => {
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
  });

  it('has hirsch control enabled, when re is true', async () => {
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

  it('has ramsch control enabled initially', async () => {
    const form = await firstValueFrom(
      potentiallyStableFormTestHelper(
        service.getForm$('group-with-three-players')
      )
    );
    expect(form.controls.ramsch.enabled).toEqual(true);
  });

  it('has ramschSchieben and ramschJungfrau controls disabled, when ramsch is false', async () => {
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

  it('has ramschSchieben and ramschJungfrau controls enabled, when ramsch is true', async () => {
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

  it('has bockSets control enabled initially', async () => {
    const form = await firstValueFrom(
      potentiallyStableFormTestHelper(
        service.getForm$('group-with-three-players')
      )
    );
    expect(form.controls.bockSets.enabled).toEqual(true);
  });

  it('has autoBockKontraLost control disabled, when bockSets is true but kontra is false', async () => {
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

  it('has autoBockKontraLost control enabled, when bockSets is true and kontra is false', async () => {
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

  it('has autoBockKontraRe control disabled, when bockSets is true but re is false', async () => {
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

  it('has autoBockKontraRe control disabled, when bockSets is true and re is true', async () => {
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

  it('has ramschSets control disabled, when bockSets is false', async () => {
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

  it('has ramschSets control enabled, when bockSets is true', async () => {
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

  it('has ramschSetsSchieben and ramschSetsJungfrau controls disabled, when ramschSets is false', async () => {
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

  it('has ramschSetsSchieben and ramschSetsJungfrau controls enabled, when ramschSets is true', async () => {
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
