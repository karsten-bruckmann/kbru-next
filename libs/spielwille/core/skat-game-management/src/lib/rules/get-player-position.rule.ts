import { PlayerPosition } from '../models/player-position.model';

export const getPlayerPosition = (
  playerIndex: number,
  numberOfPlayers: number,
  numberOfPlayedGames: number
): PlayerPosition => {
  switch (numberOfPlayers) {
    case 3:
      switch ((numberOfPlayedGames % numberOfPlayers) + playerIndex) {
        case 0:
          return 'hinterhand';
        case 1:
          return 'vorhand';
        case 2:
          return 'mittelhand';
        default:
          throw new Error(`invalid player index: ${playerIndex}`);
      }
    case 4:
      switch ((numberOfPlayedGames % numberOfPlayers) + playerIndex) {
        case 0:
          return 'inactive';
        case 1:
          return 'vorhand';
        case 2:
          return 'mittelhand';
        case 3:
          return 'mittelhand';
        default:
          throw new Error(`invalid player index: ${playerIndex}`);
      }
    case 5:
      switch ((numberOfPlayedGames % numberOfPlayers) + playerIndex) {
        case 0:
          return 'inactive';
        case 1:
          return 'vorhand';
        case 2:
          return 'inactive';
        case 3:
          return 'mittelhand';
        case 4:
          return 'hinterhand';
        default:
          throw new Error(`invalid player index: ${playerIndex}`);
      }
    default:
      throw new Error('invalid number of players');
  }
};
