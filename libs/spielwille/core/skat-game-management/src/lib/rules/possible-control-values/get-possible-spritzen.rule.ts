import { GameType } from '../../models/game-type.model';
import { List } from '../../models/list.model';
import { Spritze } from '../../models/spritze.model';

export const getPossibleSpritzen = (
  list: List,
  gameType: GameType
): Spritze[] => {
  if (['ramsch', 'durchmarsch'].includes(gameType)) {
    return [null];
  }
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
