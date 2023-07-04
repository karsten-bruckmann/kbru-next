import { createAction, props } from '@ngrx/store';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';
import { CatalogueSchema } from '../schemas/catalogue.schema';
import { GameSystemSchema } from '../schemas/game-system.schema';

export const catalogueLoadedAction = createAction(
  `${gameDefinitionDataSlice}/catalogue-loaded`,
  props<{
    gameSystem: GameSystemSchema;
    catalogue: CatalogueSchema;
  }>()
);
