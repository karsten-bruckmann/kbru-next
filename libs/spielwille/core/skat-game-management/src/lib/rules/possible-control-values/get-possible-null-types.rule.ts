import { NullType } from '../../models/null-type.model';

export const getPossibleNullTypes = (): NullType[] => [
  'einfach',
  'hand',
  'ouvert',
  'hand-ouvert',
];
