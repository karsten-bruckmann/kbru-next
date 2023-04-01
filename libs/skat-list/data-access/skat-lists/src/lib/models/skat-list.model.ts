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
    maxSets?: 1 | 3;
  };
  status: SkatListStatus;
}
