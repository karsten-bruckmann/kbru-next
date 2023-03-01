export interface BsRoster {
  gameSystemName: string;
  name: string;
  costs: BsCost[];
  costLimits: BsCost[];
  forces: BsForce[];
}

export interface BsCost {
  value: number;
  name: BsCostType;
}

export enum BsCostType {
  PL = 'PL',
  PTS = 'pts',
  CP = 'CP',
}

export interface BsForce {
  name: string;
  catalogueName: string;
  publications: string[];
  categories: BsCategory[];
  forces: BsForce[];
  selections: BsSelection[];
  rules: BsRule[];
}

export interface BsCategory {
  primary: boolean;
  name: string;
}

export interface BsSelection {
  number: number;
  type: 'upgrade' | 'unit' | 'model';
  customName?: string;
  customNotes?: string;
  name: string;
  costs: BsCost[];
  categories: BsCategory[];
  selections: BsSelection[];
  rules: BsRule[];
  profiles: BsProfile<BsTypeName>[];
}

export interface BsRule {
  name: string;
  description: string;
}

export interface BsProfile<T extends BsTypeName> {
  typeName: T;
  name: string;
}

export enum BsTypeName {
  ABILITY = 'Ability',
  UNIT = 'Unit',
  WEAPON = 'Weapon',
  WOUND_TRACK = 'Wound Track',
  TRANSPORT = 'Transport',
  PSYCHIC_POWER = 'Psychic Power',
  PRAYERS = 'Prayers',
  PSYKER = 'Psyker',
  EXPLOSION = 'Explosion',
  MUTATED_BEYOND_REASON = 'Mutated Beyond Reason',
  UNKNOWN = 'Unknown',
}

export interface BsAbilityProfile extends BsProfile<BsTypeName.ABILITY> {
  description: string;
}

export interface BsUnitProfile extends BsProfile<BsTypeName.UNIT> {
  movement: string;
  weaponSkill: string;
  ballisticSkill: string;
  strength: string;
  toughness: string;
  wounds: string;
  attacks: string;
  leadership: string;
  save: string;
}

export interface BsWeaponProfile extends BsProfile<BsTypeName.WEAPON> {
  range: string;
  type: string;
  strength: string;
  armourPenetration: string;
  damage: string;
  abilities: string;
}

export interface BsWoundTrackProfile extends BsProfile<BsTypeName.WOUND_TRACK> {
  remainingWounds: string;
  [key: string]: string;
}

export interface BsTransportProfile extends BsProfile<BsTypeName.TRANSPORT> {
  capacity: string;
}

export interface BsPsychicPowerProfile
  extends BsProfile<BsTypeName.PSYCHIC_POWER> {
  warpCharge: string;
  range: string;
  details: string;
}

export interface BsPrayerProfile extends BsProfile<BsTypeName.PRAYERS> {
  effect: string;
}

export interface BsPsykerProfile extends BsProfile<BsTypeName.PSYKER> {
  cast: string;
  deny: string;
  powersKnown: string;
  other?: string;
}

export interface BsExplosionProfile extends BsProfile<BsTypeName.EXPLOSION> {
  diceRoll: string;
  distance: string;
  mortalWounds: string;
}

export interface BsMutatedBeyondReasonProfile
  extends BsProfile<BsTypeName.MUTATED_BEYOND_REASON> {
  effect: string;
}

export interface BsUnknownProfile extends BsProfile<BsTypeName.UNKNOWN> {
  unexpectedTypeName: string;
  [key: string]: string;
}
