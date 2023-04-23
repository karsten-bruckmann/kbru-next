import { TestBed } from '@angular/core/testing';
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
import { provideMockStore } from '@ngrx/store/testing';
import { formatISO } from 'date-fns';
import { firstValueFrom } from 'rxjs';

import { SkatGameFormGroup } from './skat-game.form-group';

describe('SkatGameFormGroup', () => {
  describe('integration tests', () => {
    let formGroup: SkatGameFormGroup;

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
          listIds: ['list-a', 'list-b', 'list-c'],
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
        'player-d': {
          name: 'Player C',
        },
        'player-e': {
          name: 'Player E',
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
        'list-b': {
          created: formatISO(new Date()),
          gameIds: [],
          playerIds: ['player-a', 'player-b', 'player-c', 'player-d'],
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
        'list-c': {
          created: formatISO(new Date()),
          gameIds: [],
          playerIds: [
            'player-a',
            'player-b',
            'player-c',
            'player-d',
            'player-e',
          ],
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
      TestBed.configureTestingModule({
        providers: [provideMockStore({ initialState })],
      });
      formGroup = TestBed.inject(SkatGameFormGroup);
    });

    describe('Standard Rules', () => {
      test('only listId, playerIndex and gameType controls are enabled initially', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(formGroup.forList$('list-a'))
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

      test('only standard gameTypes are available', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(formGroup.forList$('list-a'))
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

      test('dealer is not available in four player list', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(formGroup.forList$('list-b'))
        );
        const availablePlayerIndexes = form.controls.playerIndex.possibleValues;
        expect(availablePlayerIndexes.includes(0)).toEqual(false);
        expect(availablePlayerIndexes.includes(1)).toEqual(true);
        expect(availablePlayerIndexes.includes(2)).toEqual(true);
        expect(availablePlayerIndexes.includes(3)).toEqual(true);
      });

      test('dealer and another player are not available in five player list', async () => {
        const form = await firstValueFrom(
          potentiallyStableFormTestHelper(formGroup.forList$('list-c'))
        );
        const availablePlayerIndexes = form.controls.playerIndex.possibleValues;
        expect(availablePlayerIndexes.includes(0)).toEqual(false);
        expect(availablePlayerIndexes.includes(1)).toEqual(true);
        expect(availablePlayerIndexes.includes(2)).toEqual(false);
        expect(availablePlayerIndexes.includes(3)).toEqual(true);
        expect(availablePlayerIndexes.includes(4)).toEqual(true);
      });
    });
  });
});
