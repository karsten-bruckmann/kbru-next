export interface Roster {
  title: string;
  roszUrl?: string;
  detachments: Detachment[];
}

export interface Detachment {
  title: string;
  units: Unit[];
  rules: Rule[];
}

export interface Costs {
  powerLevel: number;
  points: number;
  commandPoints: number;
}

export interface Unit {
  title: string;
  keywords: string[];
  models: Model[];
  rules: Rule[];
  containsWarlord: boolean;
}

export interface Model {
  title: string;
  warlord: boolean;
  amount: number;
  profiles: Profile[];
  weapons: Weapon[];
  psychicPowers: PsychicPower[];
  prayers: Prayer[];
  mutations: Mutation[];
}

export interface Profile {
  title: string;
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

export interface Weapon {
  title: string;
  amount: number;
  abilities: string[];
  profiles: WeaponProfile[];
}

export interface PsychicPower {
  title: string;
  profiles: PsychicPowerProfile[];
}

export interface Prayer {
  title: string;
  profiles: PrayerProfile[];
}

export interface Mutation {
  title: string;
  effect: string;
}

export interface WeaponProfile {
  title: string;
  range: string;
  type: string;
  strength: string;
  armourPenetration: string;
  damage: string;
  abilities: string;
}
export interface PrayerProfile {
  title: string;
  effect: string;
}

export interface PsychicPowerProfile {
  title: string;
  range: string;
  warpCharge: string;
  description: string;
}

export interface Rule {
  title: string;
  description: string;
}
