export interface SkatGame {
  gameType: string;
  playerIndex?: number;
  spitzen?: number;
  nullGame?: 'einfach' | 'hand' | 'ouvert' | 'hand-ouvert';
}
