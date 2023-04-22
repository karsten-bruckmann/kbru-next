import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export type ListPreset = {
  name: string;
  rules: Required<
    Omit<SkatListFormGroup['value'], 'groupId' | 'playerIds' | 'preset'>
  >;
};
