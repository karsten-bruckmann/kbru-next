import { z } from 'zod';

export const ramschSettingsSchema = z.union([
  z.boolean(),
  z.object({
    geschoben: z.boolean(),
    jungfrau: z.boolean(),
  }),
]);
