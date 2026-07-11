ALTER TABLE users ADD COLUMN IF NOT EXISTS institution_id UUID;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS institution_id UUID;
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS institution_id UUID;

CREATE INDEX IF NOT EXISTS idx_users_institution_id ON users(institution_id);
CREATE INDEX IF NOT EXISTS idx_documents_institution_id ON documents(institution_id);
