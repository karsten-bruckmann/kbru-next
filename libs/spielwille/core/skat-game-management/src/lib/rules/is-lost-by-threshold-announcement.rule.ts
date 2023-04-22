import { Threshold } from '../models/threshold.model';

export const isLostByThresholdAnnouncement = (
  threshold: Threshold,
  announced: Threshold
): boolean => {
  switch (announced) {
    case null:
      return false;
    case 'schneider':
      return threshold === null;
    case 'schwarz':
      return threshold === null || threshold === 'schneider';
  }
};
