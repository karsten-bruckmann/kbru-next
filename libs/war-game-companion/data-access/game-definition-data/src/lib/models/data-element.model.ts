import { Catalogue } from './catalogue.model';
import { CatalogueLink } from './catalogue-link.model';
import { CategoryEntry } from './category-entry.model';
import { CategoryLink } from './category-link.model';
import { Characteristic } from './characteristic.model';
import { CharacteristicType } from './characteristic-type.model';
import { Condition } from './condition.model';
import { ConditionGroup } from './condition-group.model';
import { Constraint } from './constraint.model';
import { Cost } from './cost.model';
import { CostType } from './cost-type.model';
import { EntryLink } from './entry-link.model';
import { ForceEntry } from './force-entry.model';
import { GameSystem } from './game-system.model';
import { InfoGroup } from './info-group.model';
import { InfoLink } from './info-link.model';
import { Modifier } from './modifier.model';
import { ModifierGroup } from './modifier-group.model';
import { Profile } from './profile.model';
import { ProfileType } from './profile-type.model';
import { Publication } from './publication.model';
import { Repeat } from './repeat.model';
import { Rule } from './rule.model';
import { SelectionEntry } from './selection-entry.model';
import { SelectionEntryGroup } from './selection-entry-group.model';

export type DataElement =
  | CatalogueLink
  | Catalogue
  | CategoryEntry
  | CategoryLink
  | CharacteristicType
  | Characteristic
  | ConditionGroup
  | Condition
  | Constraint
  | CostType
  | Cost
  | EntryLink
  | ForceEntry
  | GameSystem
  | InfoGroup
  | InfoLink
  | ModifierGroup
  | Modifier
  | ProfileType
  | Profile
  | Publication
  | Repeat
  | Rule
  | SelectionEntryGroup
  | SelectionEntry;
