-- Enable pgcrypto for application-level encryption at rest.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Migrate plain-text notes to encrypted bytea using the application encryption key.
ALTER TABLE tasks
  ALTER COLUMN notes SET DATA TYPE bytea
  USING pgp_sym_encrypt(notes::text, current_setting('app.encryption_key'));

-- Ensure future writes call `pgp_sym_encrypt` in the repository when Postgres integration lands.
