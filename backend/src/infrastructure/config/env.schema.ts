import { z } from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  APP_PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z
    .string()
    .url('DATABASE_URL must be a valid connection string'),
  APP_SECRET: z.string().min(32, 'APP_SECRET must be at least 32 characters'),
  QUEUE_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof EnvSchema>;
