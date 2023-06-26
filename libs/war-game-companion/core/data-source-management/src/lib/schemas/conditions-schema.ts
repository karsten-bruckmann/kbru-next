import { z } from 'zod';

import { booleanSchema } from './boolean.schema';

export const conditionsSchema = z
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
