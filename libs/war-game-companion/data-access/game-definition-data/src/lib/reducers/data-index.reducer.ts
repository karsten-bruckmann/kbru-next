import { createReducer, on } from '@ngrx/store';

import { gameDefinitionDataImported } from '../actions/game-definition-data-imported.action';
import { DataIndex } from '../models/data-index.model';

export const dataIndexReducer = createReducer<DataIndex>(
  [],
  on(gameDefinitionDataImported, (state, action) => [
    ...state.filter(
      (gs) =>
        !action.gameSystems
          .map((ags) => ags.gameSystem['@_id'])
          .includes(gs.gameSystemId)
    ),
    ...action.gameSystems.map((gs): DataIndex[0] => ({
      gameSystemId: gs.gameSystem['@_id'],
      gameSystemName: gs.gameSystem['@_name'],
      catalogues: action.catalogues
        .filter(
          (cat) => gs.gameSystem['@_id'] === cat.catalogue['@_gameSystemId']
        )
        .map((cat) => ({
          catalogueId: cat.catalogue['@_id'],
          catalogueName: cat.catalogue['@_name'],
        })),
    })),
  ])
);
