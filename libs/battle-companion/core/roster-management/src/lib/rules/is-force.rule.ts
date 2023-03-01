import { BsForce, BsSelection } from '../models/bs-roster.model';

export function isForce(
  selection: BsForce | BsSelection
): selection is BsForce {
  // eslint-disable-next-line no-prototype-builtins
  return !selection.hasOwnProperty('profiles');
}
