import { RefreshAction, refreshActionRegistry } from '@kbru/architecture';

import { RostersRequest } from './api-clients/rosters.api-client';

export type RostersRefreshAction = RefreshAction<{
  request: RostersRequest;
}>;

export const rostersRefreshActionRegistry = refreshActionRegistry<{
  request: RostersRequest;
}>();
