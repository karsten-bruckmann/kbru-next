import { playersSelector as basePlayersSelector } from '@kbru/spielwille/data-access/players';
import { skatListsSelector } from '@kbru/spielwille/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

export const listPlayersSelector = (listId: string) =>
  createSelector(
    skatListsSelector,
    basePlayersSelector,
    (lists, players): string[] =>
      lists[listId]
        ? lists[listId].playerIds.map((id: string) => players[id].name)
        : []
  );
