import { PlayerPosition } from '../models/player-position.model';

export const getPlayerPosition = (
  playerIndex: number,
  numberOfPlayers: number,
  numberOfPlayedGames: number
): PlayerPosition => {
  switch (numberOfPlayers) {
    case 3:
      switch (playerIndex) {
        case numberOfPlayedGames % numberOfPlayers:
          return 'hinterhand';
        case (numberOfPlayedGames + 1) % numberOfPlayers:
          return 'vorhand';
        case (numberOfPlayedGames + 2) % numberOfPlayers:
          return 'mittelhand';
        default:
          throw new Error(`invalid player index: ${playerIndex}`);
      }
    case 4:
      switch (playerIndex) {
        case numberOfPlayedGames % numberOfPlayers:
          return 'inactive';
        case (numberOfPlayedGames + 1) % numberOfPlayers:
          return 'vorhand';
        case (numberOfPlayedGames + 2) % numberOfPlayers:
          return 'mittelhand';
        case (numberOfPlayedGames + 3) % numberOfPlayers:
          return 'mittelhand';
        default:
          throw new Error(`invalid player index: ${playerIndex}`);
      }
    case 5:
      switch (playerIndex) {
        case numberOfPlayedGames % numberOfPlayers:
          return 'inactive';
        case (numberOfPlayedGames + 1) % numberOfPlayers:
          return 'vorhand';
        case (numberOfPlayedGames + 2) % numberOfPlayers:
          return 'inactive';
        case (numberOfPlayedGames + 3) % numberOfPlayers:
          return 'mittelhand';
        case (numberOfPlayedGames + 4) % numberOfPlayers:
          return 'hinterhand';
        default:
          throw new Error(`invalid player index: ${playerIndex}`);
      }
    default:
      throw new Error('invalid number of players');
  }
};
