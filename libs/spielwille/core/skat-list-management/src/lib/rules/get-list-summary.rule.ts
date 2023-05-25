import { SkatList } from '@kbru/spielwille/data-access/skat-lists';

import { ListCollectionItem } from '../models/list-collection-item.model';

export const getListSummary = (list: SkatList): ListCollectionItem['summary'] =>
  list.rules.addOn !== null
    ? `${list.rules.addOn}`
    : list.rules.calculationType;
