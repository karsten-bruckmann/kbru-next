import { Spritze } from '../schemas/game.schema';
import { List } from '../schemas/list.schema';

export const getPossibleSpritzen = (list: List): Spritze[] => {
  switch (list.rules.maxSpritze) {
    case null:
      return [null];
    case 'kontra':
      return [null, 'kontra'];
    case 're':
      return [null, 'kontra', 're'];
    case 'hirsch':
      return [null, 'kontra', 're', 'hirsch'];
  }
};
