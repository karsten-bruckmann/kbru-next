import { SkatListStatus } from './skat-list-status.model';

export interface SkatList {
  playerIds:
    | [string, string, string]
    | [string, string, string, string]
    | [string, string, string, string, string];
  gameIds: string[];
  rules: {
    calculationType: 'seger-fabian' | 'bierlachs';
    spitzen: 4 | 11;
    maxSets: null | 1 | 3;
    centPerPoint: 0 | 1 | 0.5 | 0.25 | 0.1;
  };
  status: SkatListStatus;
}
