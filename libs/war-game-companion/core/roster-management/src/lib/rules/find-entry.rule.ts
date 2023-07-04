/* eslint-disable @typescript-eslint/no-explicit-any */

export const findEntry = <T>(id: string, root: any): T | undefined => {
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
        found = findEntryInArray(id, slice as any[]);
        return;
      case typeof slice === 'object':
        found = findEntry(id, slice);
        return;
      default:
        return;
    }
  });

  return found as T | undefined;
};

const findEntryInArray = <T>(id: string, root: any[]): T | undefined => {
  let found: any = undefined;
  root.forEach((slice) => {
    if (found) {
      return;
    }

    found = findEntry(id, slice);
  });

  return found as T | undefined;
};
