import { z, ZodType } from 'zod';

import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface ConditionsAware {
  condition: {
    '@_field': 'selections' | 'forces' | string;
    '@_scope':
      | 'roster'
      | 'force'
      | 'primary-catalogue'
      | 'parent'
      | 'ancestor'
      | string;
    '@_value': string;
    '@_percentValue': BooleanEnum;
    '@_shared': BooleanEnum;
    '@_includeChildSelections': BooleanEnum;
    '@_includeChildForces': BooleanEnum;
    '@_childId': string;
    '@_type':
      | 'greaterThan'
      | 'lessThan'
      | 'notEqualTo'
      | 'atLeast'
      | 'equalTo'
      | 'instanceOf'
      | 'notInstanceOf'
      | 'atMost';
    comment?: string;
  }[];
}

export const conditionsSchema: ZodType<ConditionsAware> = z
  .object({
    condition: z.array(
      z
        .object({
          '@_field': z.union([z.enum(['selections', 'forces']), z.string()]),
          '@_scope': z.union([
            z.enum([
              'roster',
              'force',
              'primary-catalogue',
              'parent',
              'ancestor',
            ]),
            z.string(),
          ]),
          '@_value': z.string(),
          '@_percentValue': booleanSchema,
          '@_shared': booleanSchema,
          '@_includeChildSelections': booleanSchema,
          '@_includeChildForces': booleanSchema,
          '@_childId': z.string(),
          '@_type': z.enum([
            'greaterThan',
            'lessThan',
            'notEqualTo',
            'atLeast',
            'equalTo',
            'instanceOf',
            'notInstanceOf',
            'atMost',
          ]),
          comment: z.string().optional(),
        })
        .strict()
    ),
  })
  .strict();
