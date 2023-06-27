import { z, ZodType } from 'zod';

import { BooleanEnum, booleanSchema } from './scalar/boolean.schema';

export interface CostTypesAware {
  costType: {
    '@_hidden': BooleanEnum;
    '@_id': string;
    '@_name': string;
    '@_defaultCostLimit': string;
  }[];
}

export const costTypesSchema: ZodType<CostTypesAware> = z
  .object({
    costType: z.array(
      z
        .object({
          '@_hidden': booleanSchema,
          '@_id': z.string(),
          '@_name': z.string(),
          '@_defaultCostLimit': z.string(),
        })
        .strict()
    ),
  })
  .strict();
