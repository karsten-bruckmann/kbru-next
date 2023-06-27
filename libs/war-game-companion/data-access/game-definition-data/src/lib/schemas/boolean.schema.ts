import { z } from 'zod';

export const booleanSchema = z.enum(['true', 'false']);
