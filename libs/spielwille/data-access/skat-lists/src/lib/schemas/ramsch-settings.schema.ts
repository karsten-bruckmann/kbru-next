import { z } from 'zod';

export const ramschSettingsSchema = z.union([
  z.literal(false),
  z.object({
    geschoben: z.boolean(),
    jungfrau: z.boolean(),
  }),
]);
