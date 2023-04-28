import { AddOn } from '@kbru/spielwille/data-access/skat-lists';

import { GameType } from '../models/game-type.model';
import { PlayerInfo } from '../models/player-info.model';

export const getPlayerInfos = (
  numberOfPlayers: number,
  numberOfPlayedGames: number,
  availableGameTypes: GameType[][],
  addOn: AddOn
): PlayerInfo[][] => {
  const infos: PlayerInfo[][] = new Array(numberOfPlayers)
    .fill(null)
    .map(() => []);

  const dealer = numberOfPlayedGames % numberOfPlayers;
  infos[dealer].push('dealer');

  if (addOn === 'romanow') {
    const player = (1 + numberOfPlayedGames) % numberOfPlayers;
    const farbe = 'can-choose-farbe' as const;
    const grand = 'can-choose-grand' as const;
    const ramsch = 'can-choose-ramsch' as const;
    infos[player] = [
      ...infos[player],
      ...(availableGameTypes[player].includes('diamonds') ? [farbe] : []),
      ...(availableGameTypes[player].includes('grand') ? [grand] : []),
      ...(availableGameTypes[player].includes('ramsch') ? [ramsch] : []),
    ];
  }

  return infos;
};
