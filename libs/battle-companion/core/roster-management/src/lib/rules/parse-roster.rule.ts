/* eslint-disable no-prototype-builtins */

import * as xml2js from 'xml2js';

import {
  BsAbilityProfile,
  BsCategory,
  BsCost,
  BsCostType,
  BsExplosionProfile,
  BsForce,
  BsMutatedBeyondReasonProfile,
  BsPrayerProfile,
  BsProfile,
  BsPsychicPowerProfile,
  BsPsykerProfile,
  BsRoster,
  BsRule,
  BsSelection,
  BsTransportProfile,
  BsTypeName,
  BsUnitProfile,
  BsUnknownProfile,
  BsWeaponProfile,
  BsWoundTrackProfile,
} from '../models/bs-roster.model';
import {
  XmlAbilitiesCharacteristic,
  XmlCategory,
  XmlCharacteristic,
  XmlCost,
  XmlCostType,
  XmlExplosionCharacteristic,
  XmlForce,
  XmlMutatedBeyondReasonCharacteristic,
  XmlPrayerCharacteristic,
  XmlProfile,
  XmlPsychicPowerCharacteristic,
  XmlPsykerCharacteristic,
  XmlRule,
  XmlSelection,
  XmlTransportCharacteristic,
  XmlTypeName,
  XmlUnitCharacteristic,
  XmlWeaponCharacteristic,
  XmlWoundTrackCharacteristic,
} from '../models/xml-roster.model';

type CalculatedCosts = {
  [BsCostType.PTS]: number;
  [BsCostType.PL]: number;
  [BsCostType.CP]: number;
};

function isXmlForce(
  xmlForces: { force: XmlForce[] } | string
): xmlForces is { force: XmlForce[] } {
  return xmlForces.hasOwnProperty('force');
}

function isXmlPublication(
  xmlPublications: { publication: Array<{ $: { name: string } }> } | string
): xmlPublications is { publication: Array<{ $: { name: string } }> } {
  return xmlPublications.hasOwnProperty('publication');
}

function isXmlRule(
  xmlRules: { rule: XmlRule[] } | string
): xmlRules is { rule: XmlRule[] } {
  return xmlRules.hasOwnProperty('rule');
}

function isXmlCategory(
  xmlCategories: { category: XmlCategory[] } | string
): xmlCategories is { category: XmlCategory[] } {
  return xmlCategories.hasOwnProperty('category');
}

function isXmlSelection(
  xmlSelections: { selection: XmlSelection[] } | string
): xmlSelections is { selection: XmlSelection[] } {
  return xmlSelections.hasOwnProperty('selection');
}

function isXmlCost(
  xmlCosts: { cost: XmlCost[] } | { costLimit: XmlCost[] } | string
): xmlCosts is { cost: XmlCost[] } {
  return xmlCosts.hasOwnProperty('cost');
}

function isXmlCostLimit(
  xmlCostLimits: { cost: XmlCost[] } | { costLimit: XmlCost[] } | string
): xmlCostLimits is { costLimit: XmlCost[] } {
  return xmlCostLimits.hasOwnProperty('costLimit');
}

function isXmlProfile(
  xmlProfiles: { profile: XmlProfile<XmlCharacteristic>[] } | string
): xmlProfiles is { profile: XmlProfile<XmlCharacteristic>[] } {
  return xmlProfiles.hasOwnProperty('profile');
}

function isXmlWeaponProfile(
  xmlProfile: XmlProfile<XmlCharacteristic>
): xmlProfile is XmlProfile<XmlWeaponCharacteristic> {
  return xmlProfile.$.typeName === XmlTypeName.WEAPON;
}

function isXmlUnitProfile(
  xmlProfile: XmlProfile<XmlCharacteristic>
): xmlProfile is XmlProfile<XmlUnitCharacteristic> {
  return xmlProfile.$.typeName === XmlTypeName.UNIT;
}

function isXmlAbilitiesProfile(
  xmlProfile: XmlProfile<XmlCharacteristic>
): xmlProfile is XmlProfile<XmlAbilitiesCharacteristic> {
  return xmlProfile.$.typeName === XmlTypeName.ABILITIES;
}

function isXmlWoundTrackProfile(
  xmlProfile: XmlProfile<XmlCharacteristic>
): xmlProfile is XmlProfile<XmlWoundTrackCharacteristic> {
  return xmlProfile.$.typeName === XmlTypeName.WOUND_TRACK;
}

function isXmlTransportProfile(
  xmlProfile: XmlProfile<XmlCharacteristic>
): xmlProfile is XmlProfile<XmlTransportCharacteristic> {
  return xmlProfile.$.typeName === XmlTypeName.TRANSPORT;
}

function isXmlPsychicPowerProfile(
  xmlProfile: XmlProfile<XmlCharacteristic>
): xmlProfile is XmlProfile<XmlPsychicPowerCharacteristic> {
  return xmlProfile.$.typeName === XmlTypeName.PSYCHIC_POWER;
}

function isXmlPsykerProfile(
  xmlProfile: XmlProfile<XmlCharacteristic>
): xmlProfile is XmlProfile<XmlPsykerCharacteristic> {
  return xmlProfile.$.typeName === XmlTypeName.PSYKER;
}

function isXmlPrayerProfile(
  xmlProfile: XmlProfile<XmlCharacteristic>
): xmlProfile is XmlProfile<XmlPrayerCharacteristic> {
  return xmlProfile.$.typeName === XmlTypeName.PRAYER;
}

function isXmlMutatedBeyondReasonProfile(
  xmlProfile: XmlProfile<XmlCharacteristic>
): xmlProfile is XmlProfile<XmlMutatedBeyondReasonCharacteristic> {
  return xmlProfile.$.typeName === XmlTypeName.MUTATED_BEYOND_REASON;
}

function isXmlExplosionProfile(
  xmlProfile: XmlProfile<XmlCharacteristic>
): xmlProfile is XmlProfile<XmlExplosionCharacteristic> {
  return xmlProfile.$.typeName === XmlTypeName.EXPLOSION;
}

function isXmlCharacteristic(
  xmlCharacteristics: { characteristic: XmlCharacteristic[] } | string
): xmlCharacteristics is { characteristic: XmlCharacteristic[] } {
  return xmlCharacteristics.hasOwnProperty('characteristic');
}

const calculateCosts = (selections: BsSelection[]): CalculatedCosts => {
  const costs = {
    [BsCostType.PTS]: 0,
    [BsCostType.PL]: 0,
    [BsCostType.CP]: 0,
  };

  const getCost = (selection: BsSelection, costType: BsCostType): number =>
    selection.costs.find((cost) => cost.name === costType)?.value || 0;

  selections.forEach((selection) => {
    costs.pts += getCost(selection, BsCostType.PTS);
    costs.PL += getCost(selection, BsCostType.PL);
    costs.CP += getCost(selection, BsCostType.CP);
  });

  return costs;
};

const toCostArray = (
  xmlCosts:
    | Array<{ cost: XmlCost[] } | { costLimit: XmlCost[] } | string>
    | undefined,
  additionalCosts: CalculatedCosts = {
    [BsCostType.PTS]: 0,
    [BsCostType.PL]: 0,
    [BsCostType.CP]: 0,
  }
): BsCost[] => {
  const costs: BsCost[] = [];

  if (xmlCosts) {
    xmlCosts.forEach((xmlCosts) => {
      (isXmlCost(xmlCosts)
        ? xmlCosts.cost
        : isXmlCostLimit(xmlCosts)
        ? xmlCosts.costLimit
        : []
      ).forEach((xmlCost) => {
        let name: BsCostType;
        switch (xmlCost.$.name) {
          case XmlCostType.PTS:
            name = BsCostType.PTS;
            break;
          case XmlCostType.CP:
            name = BsCostType.CP;
            break;
          case XmlCostType.PL:
          default:
            name = BsCostType.PL;
        }

        costs.push({
          value: +xmlCost.$.value + additionalCosts[name],
          name,
        });
      });
    });
  }

  return costs;
};

const toForceArray = (
  xmlForces: Array<{ force: XmlForce[] } | string> | undefined
): BsForce[] => {
  const forces: BsForce[] = [];

  if (!xmlForces) {
    return [];
  }

  xmlForces.forEach((xmlForces) => {
    if (isXmlForce(xmlForces)) {
      xmlForces.force.forEach((xmlForce) => {
        const force: Partial<BsForce> = {
          name: xmlForce.$.name,
          catalogueName: xmlForce.$.catalogueName,
        };

        force.publications = toPublicationArray(xmlForce.publications);
        force.categories = toCategoryArray(xmlForce.categories);
        force.forces = toForceArray(xmlForce.forces);
        force.rules = toRuleArray(xmlForce.rules);
        force.selections = toSelectionArray(xmlForce.selections);

        forces.push(force as BsForce);
      });
    }
  });

  return forces;
};

const toPublicationArray = (
  xmlPublications: Array<
    { publication: Array<{ $: { name: string } }> } | string
  >
): string[] => {
  const publications: string[] = [];
  xmlPublications.forEach((xmlPublications) => {
    if (isXmlPublication(xmlPublications)) {
      xmlPublications.publication.forEach((xmlPublication) => {
        publications.push(xmlPublication.$.name);
      });
    }
  });

  return publications;
};

const toCategoryArray = (
  xmlCategories: Array<{ category: XmlCategory[] } | string> | undefined
): BsCategory[] => {
  if (!xmlCategories) {
    return [];
  }

  const categories: BsCategory[] = [];
  xmlCategories.forEach((xmlCategories) => {
    if (isXmlCategory(xmlCategories)) {
      xmlCategories.category.forEach((xmlCategory) => {
        categories.push({
          primary: xmlCategory.$.primary === 'true',
          name: xmlCategory.$.name,
        });
      });
    }
  });

  return categories;
};

const toRuleArray = (
  xmlRules: Array<{ rule: XmlRule[] } | string> | undefined
): BsRule[] => {
  const rules: BsRule[] = [];

  if (!xmlRules) {
    return [];
  }

  xmlRules.forEach((xmlRules) => {
    if (isXmlRule(xmlRules)) {
      xmlRules.rule.forEach((xmlRule) => {
        rules.push({
          name: xmlRule.$.name,
          description: xmlRule.description[0] || '-',
        });
      });
    }
  });

  return rules;
};

const toSelectionArray = (
  xmlSelections: Array<{ selection: XmlSelection[] } | string> | undefined
): BsSelection[] => {
  if (!xmlSelections) {
    return [];
  }

  const selections: BsSelection[] = [];
  xmlSelections.forEach((xmlSelections) => {
    if (isXmlSelection(xmlSelections)) {
      xmlSelections.selection.forEach((xmlSelection) => {
        const selection: Partial<BsSelection> = {
          number: +xmlSelection.$.number,
          type: xmlSelection.$.type,
          name: xmlSelection.$.name,
          customName: xmlSelection.$.customName,
          customNotes: xmlSelection.$.customNotes,
        };

        selection.categories = toCategoryArray(xmlSelection.categories);
        selection.rules = toRuleArray(xmlSelection.rules);
        selection.profiles = toProfileArray(xmlSelection.profiles);
        selection.selections = toSelectionArray(xmlSelection.selections);
        selection.costs = toCostArray(
          xmlSelection.costs,
          calculateCosts(selection.selections)
        );

        selections.push(selection as BsSelection);
      });
    }
  });
  return selections;
};

const toProfileArray = (
  xmlProfiles:
    | Array<{ profile: XmlProfile<XmlCharacteristic>[] } | string>
    | undefined
): BsProfile<BsTypeName>[] => {
  if (!xmlProfiles) {
    return [];
  }

  const profiles: BsProfile<BsTypeName>[] = [];
  xmlProfiles.forEach((xmlProfiles) => {
    if (isXmlProfile(xmlProfiles)) {
      xmlProfiles.profile.forEach((xmlProfile) => {
        profiles.push(getProfile(xmlProfile));
      });
    }
  });

  return profiles;
};

abstract class AbstractProfileConverter<
  S extends BsProfile<BsTypeName>,
  T extends XmlCharacteristic
> {
  private profile: S;

  protected constructor(profile: S) {
    this.profile = profile;
  }

  convert(xmlProfile: XmlProfile<T>): S {
    this.profile.name = xmlProfile.$.name || '-';

    xmlProfile.characteristics.forEach((xmlCharacteristic) => {
      if (isXmlCharacteristic(xmlCharacteristic)) {
        xmlCharacteristic.characteristic.forEach((xmlCharacteristic) => {
          Object.assign(this.profile, this.getProperty(xmlCharacteristic));
        });
      }
    });

    return this.profile;
  }

  protected abstract getProperty(xmlCharacteristic: T): Partial<S>;
}

class WeaponProfileConverter extends AbstractProfileConverter<
  BsWeaponProfile,
  XmlWeaponCharacteristic
> {
  constructor() {
    super({
      typeName: BsTypeName.WEAPON,
      name: '-',
      range: '-',
      type: '-',
      strength: '-',
      armourPenetration: '-',
      damage: '-',
      abilities: '-',
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlWeaponCharacteristic
  ): Partial<BsWeaponProfile> {
    switch (xmlCharacteristic.$.name) {
      case 'Range':
        return { range: xmlCharacteristic._ };
      case 'Type':
        return { type: xmlCharacteristic._ };
      case 'S':
        return { strength: xmlCharacteristic._ };
      case 'AP':
        return { armourPenetration: xmlCharacteristic._ };
      case 'D':
        return { damage: xmlCharacteristic._ };
      case 'Abilities':
        return { abilities: xmlCharacteristic._ };
    }
  }
}

class UnitProfileConverter extends AbstractProfileConverter<
  BsUnitProfile,
  XmlUnitCharacteristic
> {
  constructor() {
    super({
      typeName: BsTypeName.UNIT,
      name: '-',
      movement: '-',
      weaponSkill: '-',
      ballisticSkill: '-',
      strength: '-',
      toughness: '-',
      wounds: '-',
      attacks: '-',
      leadership: '-',
      save: '-',
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlUnitCharacteristic
  ): Partial<BsUnitProfile> {
    switch (xmlCharacteristic.$.name) {
      case 'M':
        return { movement: xmlCharacteristic._ };
      case 'WS':
        return { weaponSkill: xmlCharacteristic._ };
      case 'BS':
        return { ballisticSkill: xmlCharacteristic._ };
      case 'S':
        return { strength: xmlCharacteristic._ };
      case 'T':
        return { toughness: xmlCharacteristic._ };
      case 'W':
        return { wounds: xmlCharacteristic._ };
      case 'A':
        return { attacks: xmlCharacteristic._ };
      case 'Ld':
        return { leadership: xmlCharacteristic._ };
      case 'Save':
        return { save: xmlCharacteristic._ };
    }
  }
}

class AbilityProfileConverter extends AbstractProfileConverter<
  BsAbilityProfile,
  XmlAbilitiesCharacteristic
> {
  constructor() {
    super({
      typeName: BsTypeName.ABILITY,
      name: '-',
      description: '-',
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlAbilitiesCharacteristic
  ): Partial<BsAbilityProfile> {
    return xmlCharacteristic.$.name === 'Description'
      ? { description: xmlCharacteristic._ }
      : {};
  }
}

class WoundTrackProfileConverter extends AbstractProfileConverter<
  BsWoundTrackProfile,
  XmlWoundTrackCharacteristic
> {
  constructor() {
    super({
      typeName: BsTypeName.WOUND_TRACK,
      name: '-',
      remainingWounds: '-',
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlWoundTrackCharacteristic
  ): Partial<BsWoundTrackProfile> {
    if (xmlCharacteristic.$.name === 'Remaining W') {
      return { remainingWounds: xmlCharacteristic._ };
    } else {
      return { [xmlCharacteristic.$.name]: xmlCharacteristic._ };
    }
  }
}

class TransportProfileConverter extends AbstractProfileConverter<
  BsTransportProfile,
  XmlTransportCharacteristic
> {
  constructor() {
    super({
      typeName: BsTypeName.TRANSPORT,
      name: '-',
      capacity: '-',
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlTransportCharacteristic
  ): Partial<BsTransportProfile> {
    return xmlCharacteristic.$.name === 'Capacity'
      ? { capacity: xmlCharacteristic._ }
      : {};
  }
}

class PsychicPowerProfileConverter extends AbstractProfileConverter<
  BsPsychicPowerProfile,
  XmlPsychicPowerCharacteristic
> {
  constructor() {
    super({
      typeName: BsTypeName.PSYCHIC_POWER,
      name: '-',
      warpCharge: '-',
      range: '-',
      details: '-',
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlPsychicPowerCharacteristic
  ): Partial<BsPsychicPowerProfile> {
    switch (xmlCharacteristic.$.name) {
      case 'Warp Charge':
        return { warpCharge: xmlCharacteristic._ };
      case 'Range':
        return { range: xmlCharacteristic._ };
      case 'Details':
        return { details: xmlCharacteristic._ };
    }
  }
}

class PsykerProfileConverter extends AbstractProfileConverter<
  BsPsykerProfile,
  XmlPsykerCharacteristic
> {
  constructor() {
    super({
      typeName: BsTypeName.PSYKER,
      name: '-',
      cast: '-',
      deny: '-',
      powersKnown: '-',
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlPsykerCharacteristic
  ): Partial<BsPsykerProfile> {
    switch (xmlCharacteristic.$.name) {
      case 'Cast':
        return { cast: xmlCharacteristic._ };
      case 'Deny':
        return { deny: xmlCharacteristic._ };
      case 'Powers Known':
        return { powersKnown: xmlCharacteristic._ };
      case 'Other':
        return { other: xmlCharacteristic._ };
    }
  }
}

class PrayerProfileConverter extends AbstractProfileConverter<
  BsPrayerProfile,
  XmlPrayerCharacteristic
> {
  constructor() {
    super({
      typeName: BsTypeName.PRAYERS,
      name: '-',
      effect: '-',
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlPrayerCharacteristic
  ): Partial<BsPrayerProfile> {
    switch (xmlCharacteristic.$.name) {
      case 'Effect':
        return { effect: xmlCharacteristic._ };
    }
  }
}

class ExplosionProfileConverter extends AbstractProfileConverter<
  BsExplosionProfile,
  XmlExplosionCharacteristic
> {
  constructor() {
    super({
      typeName: BsTypeName.EXPLOSION,
      name: '-',
      diceRoll: '-',
      distance: '-',
      mortalWounds: '-',
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlExplosionCharacteristic
  ): Partial<BsExplosionProfile> {
    switch (xmlCharacteristic.$.name) {
      case 'Dice roll':
        return { diceRoll: xmlCharacteristic._ };
      case 'Distance':
        return { distance: xmlCharacteristic._ };
      case 'Mortal wounds':
        return { mortalWounds: xmlCharacteristic._ };
    }
  }
}

class MutatedBeyondReasonProfileConverter extends AbstractProfileConverter<
  BsMutatedBeyondReasonProfile,
  XmlMutatedBeyondReasonCharacteristic
> {
  constructor() {
    super({
      typeName: BsTypeName.MUTATED_BEYOND_REASON,
      name: '-',
      effect: '-',
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlMutatedBeyondReasonCharacteristic
  ): Partial<BsMutatedBeyondReasonProfile> {
    switch (xmlCharacteristic.$.name) {
      case 'Effect':
        return { effect: xmlCharacteristic._ };
    }
  }
}

class UnknownProfileConverter extends AbstractProfileConverter<
  BsUnknownProfile,
  XmlCharacteristic
> {
  constructor(unexpectedTypeName: string) {
    super({
      typeName: BsTypeName.UNKNOWN,
      name: '-',
      unexpectedTypeName,
    });
  }

  protected getProperty(
    xmlCharacteristic: XmlCharacteristic
  ): Partial<BsUnknownProfile> {
    return { [xmlCharacteristic.$.name]: xmlCharacteristic._ };
  }
}

const getProfile = (
  xmlProfile: XmlProfile<XmlCharacteristic>
): BsProfile<BsTypeName> => {
  let converter: AbstractProfileConverter<
    BsProfile<BsTypeName>,
    XmlCharacteristic
  >;

  if (isXmlWeaponProfile(xmlProfile)) converter = new WeaponProfileConverter();
  else if (isXmlUnitProfile(xmlProfile)) converter = new UnitProfileConverter();
  else if (isXmlAbilitiesProfile(xmlProfile))
    converter = new AbilityProfileConverter();
  else if (isXmlWoundTrackProfile(xmlProfile))
    converter = new WoundTrackProfileConverter();
  else if (isXmlTransportProfile(xmlProfile))
    converter = new TransportProfileConverter();
  else if (isXmlPsychicPowerProfile(xmlProfile))
    converter = new PsychicPowerProfileConverter();
  else if (isXmlPsykerProfile(xmlProfile))
    converter = new PsykerProfileConverter();
  else if (isXmlPrayerProfile(xmlProfile))
    converter = new PrayerProfileConverter();
  else if (isXmlExplosionProfile(xmlProfile))
    converter = new ExplosionProfileConverter();
  else if (isXmlMutatedBeyondReasonProfile(xmlProfile))
    converter = new MutatedBeyondReasonProfileConverter();
  else
    converter = new UnknownProfileConverter(
      (xmlProfile as { $: { name: string } }).$.name
    );

  return converter.convert(xmlProfile);
};

export const parse = (xml: string): Promise<BsRoster> => {
  return new Promise((resolve) => {
    xml2js.parseString(xml, (_, xmlRoster) => {
      const {
        $,
        costs: xmlCosts,
        costLimits: xmlCostLimits,
        forces: xmlForces,
      } = xmlRoster.roster;

      const roster: Partial<BsRoster> = {
        gameSystemName: $.gameSystemName,
        name: $.name,
      };

      roster.costs = toCostArray(xmlCosts);
      roster.costLimits = toCostArray(xmlCostLimits);
      roster.forces = toForceArray(xmlForces);

      resolve(roster as BsRoster);
    });
  });
};
