import { SkatList } from '@kbru/spielwille/data-access/skat-lists';
import { formatISO } from 'date-fns';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { getRulesFromFormGroup } from './get-rules-from-form-group.rule';

export const getListFromFormGroup = (
  formGroup: SkatListFormGroup
): SkatList => {
  if (!formGroup.valid) {
    throw new Error('could not create list');
  }

  const formValue = formGroup.getRawValue();

  return {
    created: formatISO(new Date()),
    gameIds: [],
    playerIds: formValue.playerIds ?? [],
    rules: getRulesFromFormGroup(formGroup),
    points: new Array(formValue.playerIds?.length).fill(0),
  };
};
