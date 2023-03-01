export interface XmlRoster {
  $: {
    gameSystemName: string;
    name: string;
  };

  costs: [
    {
      cost: XmlCost[];
    }
  ];

  costLimits: [
    {
      costLimit: XmlCost[];
    }
  ];

  forces: [
    {
      force: XmlForce[];
    }
  ];
}

export interface XmlCost {
  $: {
    value: string;
    name: XmlCostType;
  };
}

export enum XmlCostType {
  PL = ' PL',
  PTS = 'pts',
  CP = 'CP',
}

export interface XmlForce {
  $: {
    name: string;
    catalogueName: string;
  };

  publications: Array<{ publication: Array<{ $: { name: string } }> } | string>;
  categories: Array<{ category: XmlCategory[] } | string>;
  selections: Array<{ selection: XmlSelection[] } | string>;
  forces: Array<{ force: XmlForce[] } | string>;
  rules: Array<{ rule: XmlRule[] } | string>;
}

export interface XmlCategory {
  $: {
    primary: string;
    name: string;
  };
}

export interface XmlSelection {
  $: {
    number: string;
    type: 'upgrade' | 'unit' | 'model';
    customName?: string;
    customNotes?: string;
    name: string;
  };
  costs: Array<{ cost: XmlCost[] } | string>;
  categories: Array<{ category: XmlCategory[] } | string>;
  selections: Array<{ selection: XmlSelection[] } | string>;
  rules: Array<{ rule: XmlRule[] } | string>;
  profiles: Array<{ profile: XmlProfile<XmlCharacteristic>[] } | string>;
}

export interface XmlRule {
  $: {
    name: string;
  };

  description: string[];
}

export interface XmlProfile<T extends XmlCharacteristic> {
  $: {
    typeName: XmlTypeName;
    name: string;
  };
  characteristics: Array<{ characteristic: T[] } | string>;
}

export enum XmlTypeName {
  WEAPON = 'Weapon',
  UNIT = 'Unit',
  ABILITIES = 'Abilities',
  WOUND_TRACK = 'Wound Track',
  TRANSPORT = 'Transport',
  PSYCHIC_POWER = 'Psychic Power',
  PSYKER = 'Psyker',
  PRAYER = 'Prayers',
  MUTATED_BEYOND_REASON = 'Mutated Beyond Reason',
  EXPLOSION = 'Explosion',
}

export interface XmlCharacteristic {
  $: {
    name: string;
  };
  _?: string;
}

export interface XmlWeaponCharacteristic extends XmlCharacteristic {
  $: {
    name: 'Range' | 'Type' | 'S' | 'AP' | 'D' | 'Abilities';
  };
}

export interface XmlUnitCharacteristic extends XmlCharacteristic {
  $: {
    name: 'M' | 'WS' | 'BS' | 'S' | 'T' | 'W' | 'A' | 'Ld' | 'Save';
  };
}

export interface XmlAbilitiesCharacteristic extends XmlCharacteristic {
  $: {
    name: 'Description';
  };
}

export interface XmlWoundTrackCharacteristic extends XmlCharacteristic {
  $: {
    name:
      | 'Remaining W'
      | 'Characteristic 1'
      | 'Characteristic 2'
      | 'Characteristic 3'
      | 'Characteristic 4'
      | 'Characteristic 5'
      | 'Characteristic 6'
      | 'Characteristic 7'
      | 'Characteristic 8'
      | 'Characteristic 9';
  };
}

export interface XmlTransportCharacteristic extends XmlCharacteristic {
  $: {
    name: 'Capacity';
  };
}

export interface XmlPsychicPowerCharacteristic extends XmlCharacteristic {
  $: {
    name: 'Warp Charge' | 'Range' | 'Details';
  };
}

export interface XmlPrayerCharacteristic extends XmlCharacteristic {
  $: {
    name: 'Effect';
  };
}

export interface XmlPsykerCharacteristic extends XmlCharacteristic {
  $: {
    name: 'Cast' | 'Deny' | 'Powers Known' | 'Other';
  };
}

export interface XmlExplosionCharacteristic extends XmlCharacteristic {
  $: {
    name: 'Dice roll' | 'Distance' | 'Mortal wounds';
  };
}
export interface XmlMutatedBeyondReasonCharacteristic
  extends XmlCharacteristic {
  $: {
    name: 'Effect';
  };
}
