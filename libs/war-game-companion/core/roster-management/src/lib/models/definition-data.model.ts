import {
  Catalogue,
  GameSystem,
} from '@kbru/war-game-companion/data-access/game-definition-data';

export type DefinitionData = Omit<
  GameSystem,
  | 'authorContact'
  | 'authorName'
  | 'authorUrl'
  | 'battleScribeVersion'
  | 'id'
  | 'name'
  | 'revision'
  | 'readme'
> &
  Omit<
    Catalogue,
    | 'authorContact'
    | 'authorName'
    | 'authorUrl'
    | 'battleScribeVersion'
    | 'id'
    | 'name'
    | 'revision'
    | 'library'
    | 'gameSystemId'
    | 'gameSystemRevision'
    | 'readme'
    | 'comment'
  >;
