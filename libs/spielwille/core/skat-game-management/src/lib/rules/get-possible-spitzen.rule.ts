import { List } from '../models/list.model';

export const getPossibleSpitzen = (list: List): number[] => {
  if (list.rules.spitzen === 4) {
    return [-4, -3, -2, -1, 1, 2, 3, 4];
  }

  return [
    -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 6, 7, 8, 9, 10,
    11,
  ];
};
