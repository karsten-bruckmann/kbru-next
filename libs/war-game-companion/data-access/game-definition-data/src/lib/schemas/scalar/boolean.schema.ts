import { z, ZodType } from 'zod';

export type BooleanEnum = 'true' | 'false';

export const booleanSchema: ZodType<BooleanEnum> = z.enum(['true', 'false']);
