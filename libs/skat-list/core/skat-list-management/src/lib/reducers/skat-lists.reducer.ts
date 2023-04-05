import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { SkatListsState } from '@kbru/skat-list/data-access/skat-lists';
import { on } from '@ngrx/store';

import { skatListFormSubmittedAction } from '../actions/skat-list-form-submitted.action';

export const skatListsReducer = createCoreReducer<SkatListsState>(
  on(
    skatListFormSubmittedAction,
    (state, action): SkatListsState => ({
      ...state,
      [action.uuid]: action.skatList,
    })
  )
);
