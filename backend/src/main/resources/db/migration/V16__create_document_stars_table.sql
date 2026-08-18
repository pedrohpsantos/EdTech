-- V16: Fix Document Starred IDOR (Global to Per-User)
-- This fixes SEC-MED-03 by migrating from the global 'starred' boolean
-- to a proper many-to-many relationship without breaking existing schemas (no destructive drops).

CREATE TABLE IF NOT EXISTS document_stars (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, document_id)
);

CREATE INDEX idx_document_stars_user_id ON document_stars(user_id);
CREATE INDEX idx_document_stars_document_id ON document_stars(document_id);

-- Opcional: Se quiséssemos manter compatibilidade e não quebrar a API, o backend
-- usaria document_stars para leitura/gravação em vez da coluna documents.starred
