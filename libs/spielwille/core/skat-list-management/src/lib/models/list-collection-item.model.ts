import { SkatList } from '@kbru/spielwille/data-access/skat-lists';

export interface ListCollectionItem {
  id: string;
  summary: NonNullable<
    SkatList['rules']['addOn'] | SkatList['rules']['calculationType']
  >;
  lastUpdate: Date;
  playerNames: string[];
}
