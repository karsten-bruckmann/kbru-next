import {
  Catalogue,
  GameSystem,
} from '@kbru/war-game-companion/data-access/game-definition-data';

export type DefinitionData = {
  gameSystem: {
    id: string;
    name: string;
  };
  catalogue: {
    id: string;
    name: string;
  };
} & Omit<
  GameSystem,
  | '__type'
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
    | '__type'
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
