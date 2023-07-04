import { createFeatureSelector } from '@ngrx/store';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';
import { DataIndex } from '../models/data-index.model';

export const dataIndexSelector = createFeatureSelector<DataIndex>(
  `${gameDefinitionDataSlice}:data-index`
);
