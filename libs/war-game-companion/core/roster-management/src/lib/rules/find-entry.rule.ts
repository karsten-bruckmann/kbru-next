/* eslint-disable @typescript-eslint/no-explicit-any */

import { DataElement } from '@kbru/war-game-companion/data-access/game-definition-data';

export const findEntry = <T extends DataElement>(
  id: string,
  type: T['__type'],
  root: any
): T | undefined => {
  if (root['id'] === id) {
    return root as T;
  }

  let found: any = undefined;
  Object.values(root).forEach((slice) => {
    if (found) {
      return;
    }
    switch (true) {
      case Array.isArray(slice):
        found = findEntryInArray(id, type, slice as any[]);
        return;
      case typeof slice === 'object':
        found = findEntry(id, type, slice);
        return;
      default:
        return;
    }
  });

  if (!found || found.__type !== type) {
    return undefined;
  }

  return found;
};

const findEntryInArray = <T extends DataElement>(
  id: string,
  type: T['__type'],
  root: any[]
): T | undefined => {
  let found: any = undefined;
  root.forEach((slice) => {
    if (found) {
      return;
    }

    found = findEntry(id, type, slice);
  });

  return found as T | undefined;
};
