import { refreshActionRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { UnitsRequest } from './api-clients/units.api-client';

export const unitsRefreshActionRegistry = refreshActionRegistry<{
  request: UnitsRequest;
}>();
