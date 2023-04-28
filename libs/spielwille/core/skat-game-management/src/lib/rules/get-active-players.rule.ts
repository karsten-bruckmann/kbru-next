export const getActivePlayers = (
  numberOfPlayers: number,
  numberOfPlayedGamed: number
): [number, number, number] => {
  let activePlayers: [number, number, number];
  switch (numberOfPlayers) {
    case 3:
      activePlayers = [
        (1 + numberOfPlayedGamed) % numberOfPlayers,
        (2 + numberOfPlayedGamed) % numberOfPlayers,
        (0 + numberOfPlayedGamed) % numberOfPlayers,
      ];
      break;
    case 4:
      activePlayers = [
        (1 + numberOfPlayedGamed) % numberOfPlayers,
        (2 + numberOfPlayedGamed) % numberOfPlayers,
        (3 + numberOfPlayedGamed) % numberOfPlayers,
      ];
      break;
    case 5:
      activePlayers = [
        (1 + numberOfPlayedGamed) % numberOfPlayers,
        (3 + numberOfPlayedGamed) % numberOfPlayers,
        (4 + numberOfPlayedGamed) % numberOfPlayers,
      ];
      break;
    default:
      throw new Error('invalid number of players');
  }

  return activePlayers;
};
