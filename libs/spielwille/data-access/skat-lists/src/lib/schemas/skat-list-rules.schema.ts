import { z } from 'zod';

import { ramschSettingsSchema } from './ramsch-settings.schema';

export type SkatListRules = z.infer<typeof skatLisRulesSchema>;

export const skatLisRulesSchema = z.object({
  addOn: z.nullable(z.literal('romanow')),
  calculationType: z.union([z.literal('seger-fabian'), z.literal('bierlachs')]),
  maxSets: z.nullable(z.number()),
  centPerPoint: z.number(),
  spitzen: z.union([z.literal(4), z.literal(11)]),
  saechsischeSpitze: z.boolean(),
  thresholdAnnouncementWithoutHand: z.boolean(),
  maxSpritze: z.nullable(
    z.union([z.literal('kontra'), z.literal('re'), z.literal('hirsch')])
  ),
  ramsch: ramschSettingsSchema,
  bockSets: z.union([
    z.boolean(),
    z.object({
      kontraRe: z.boolean(),
      kontraLost: z.boolean(),
      ramsch: ramschSettingsSchema,
    }),
  ]),
});
