import { Injector } from '@angular/core';
import { potentiallyStableFormTestHelper } from '@kbru/shared/utils/effect-aware-forms';
import { groupsSlice, GroupsState } from '@kbru/spielwille/data-access/groups';
import {
  playersSlice,
  PlayersState,
} from '@kbru/spielwille/data-access/players';
import {
  skatListsSlice,
  SkatListsState,
} from '@kbru/spielwille/data-access/skat-lists';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { formatISO } from 'date-fns';
import { cold } from 'jest-marbles';
import { catchError, firstValueFrom, map } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { SkatGameFormService } from './skat-game-form.service';

describe('SkatGameFormService::getForm$() - Integration Tests for created form', () => {
  let service: SkatGameFormService;
  let store$: MockStore;

  const initialState: {
    [groupsSlice]: GroupsState;
    [playersSlice]: PlayersState;
    [skatListsSlice]: SkatListsState;
  } = {
    [groupsSlice]: {
      'group-a': {
        name: 'Group With Three Players',
        created: formatISO(new Date()),
        playerIds: ['player-a', 'player-b', 'player-c'],
        listIds: ['list-a'],
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
    [skatListsSlice]: {
      'list-a': {
        created: formatISO(new Date()),
        gameIds: [],
        playerIds: ['player-a', 'player-b', 'player-c'],
        rules: {
          addOn: null,
          bockSets: false,
          calculationType: 'seger-fabian',
          centPerPoint: 0,
          maxSets: 3,
          maxSpritze: null,
          ramsch: false,
          saechsischeSpitze: false,
          spitzen: 11,
          thresholdAnnouncementWithoutHand: false,
        },
        status: null,
      },
    },
  };

  beforeEach(() => {
    const injector = Injector.create({
      providers: [provideMockStore({ initialState })],
    });
    store$ = injector.get(MockStore);
    service = new SkatGameFormService(store$);
  });

  it("emits no value when list doesn't exist", () => {
    expect(
      service.getForm$('non-existing-list').pipe(
        map((f) => f.value),
        catchError((e) => {
          console.error(e);
          throw e;
        })
      )
    ).toBeObservable(cold(''));
  });

  it('emits a form when list exists', async () => {
    const form = await firstValueFrom(
      potentiallyStableFormTestHelper(service.getForm$('list-a'))
    );
    expect(form).toBeTruthy();
  });

  describe('Standard Rules', () => {
    it('only has listId, playerIndex and gameType controls enabled initially', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(service.getForm$('list-a'))
      );
      const enabledFields = Object.keys(form.controls).filter(
        (name) =>
          form.controls[name as keyof SkatGameFormGroup['controls']]?.enabled
      );
      expect(enabledFields.includes('listId')).toEqual(true);
      expect(enabledFields.includes('playerIndex')).toEqual(true);
      expect(enabledFields.includes('gameType')).toEqual(true);
      expect(enabledFields.length).toEqual(3);
    });

    it('only has only standard gameTypes available', async () => {
      const form = await firstValueFrom(
        potentiallyStableFormTestHelper(service.getForm$('list-a'))
      );
      const availableGameTypes = form.controls.gameType.possibleValues;
      expect(availableGameTypes.includes('diamonds')).toEqual(true);
      expect(availableGameTypes.includes('hearts')).toEqual(true);
      expect(availableGameTypes.includes('spades')).toEqual(true);
      expect(availableGameTypes.includes('clubs')).toEqual(true);
      expect(availableGameTypes.includes('grand')).toEqual(true);
      expect(availableGameTypes.includes('null')).toEqual(true);
      expect(availableGameTypes.length).toEqual(6);
    });
  });
});
