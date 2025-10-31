import { config } from 'dotenv';
import { Env, EnvSchema } from './env.schema';

config();

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    'ERROR: Invalid environment configuration',
    parsed.error.flatten(),
  );
  process.exit(1);
}

export const env: Env = parsed.data;
