import { refreshActionRegistry } from '@kbru/shared/utils/ngrx-architecture';

export const gameDefinitionDataRefreshActionRegistry = refreshActionRegistry<{
  indexUrl: string;
}>();
