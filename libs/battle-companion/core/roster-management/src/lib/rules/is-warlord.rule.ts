import { BsSelection } from '../models/bs-roster.model';

export const isWarlord = (model: BsSelection): boolean =>
  !!model.selections.find(
    (selection) => selection.type === 'upgrade' && selection.name === 'Warlord'
  );
