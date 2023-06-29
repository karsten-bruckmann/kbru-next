import { CatalogueSchema } from '../schemas/catalogue.schema';
import { GameSystemSchema } from '../schemas/game-system.schema';

export interface GameDefinitionDataState {
  repositoryName: string;
  gameSystem: GameSystemSchema['gameSystem'];
  catalogues: Record<string, CatalogueSchema['catalogue']>;
}
