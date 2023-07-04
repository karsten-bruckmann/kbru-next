import { CatalogueSchema } from '../schemas/catalogue.schema';
import { GameSystemSchema } from '../schemas/game-system.schema';

export interface GameDefinitionDataState {
  gameSystem: GameSystemSchema['gameSystem'];
  catalogue: CatalogueSchema['catalogue'];
}
