import { AddOn } from './add-on.enum';
import { SkatListStatus } from './skat-list-status.model';

export interface SkatList {
  created: string;
  playerIds: string[];
  gameIds: string[];
  rules: {
    addOns: AddOn[];
    calculationType: 'seger-fabian' | 'bierlachs';
    maxSets: null | number;
    centPerPoint: number;
    spitzen: 4 | 11;
    saechsischeSpitze: boolean;
    thresholdAnnouncementWithoutHand: boolean;
    maxSpritze: 'none' | 'kontra' | 're' | 'bock' | 'hirsch';
    ramsch: RamschSettings;
    bockSets:
      | false
      | {
          kontraRe: boolean;
          kontraLost: boolean;
          ramsch: RamschSettings;
        };
  };
  status: SkatListStatus | null;
}

type RamschSettings =
  | false
  | {
      geschoben: boolean;
      jungfrau: boolean;
    };
