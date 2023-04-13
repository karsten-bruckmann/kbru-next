import { z } from 'zod';

export type Player = z.infer<typeof playerSchema>;

export const playerSchema = z.object({
  name: z.string(),
});
