import { z } from 'zod';

import { profilesSchema } from '../schemas/profiles.schema';
import { Characteristic, getCharacteristics } from './characteristic.model';
import { getModifiers, Modifier } from './modifier.model';
import { getModifierGroups, ModifierGroup } from './modifier-group.model';

export interface Profile {
  id: string;
  name: string;
  hidden: boolean;
  typeId: string;
  typeName: string;
  publicationId?: string;
  page?: string;
  characteristics: Characteristic[];
  modifiers: Modifier[];
  modifierGroups: ModifierGroup[];
}

export const getProfiles = (
  data?: z.infer<typeof profilesSchema>
): Profile[] => {
  return !data
    ? []
    : data.profile.map((p) => ({
        id: p['@_id'],
        name: p['@_name'],
        hidden: p['@_hidden'] === 'true',
        typeId: p['@_typeId'],
        typeName: p['@_typeName'],
        publicationId: p['@_publicationId'],
        page: p['@_page'],
        characteristics: getCharacteristics(p.characteristics),
        modifiers: getModifiers(p.modifiers),
        modifierGroups: getModifierGroups(p.modifierGroups),
      }));
};
