CREATE TYPE document_status as ENUM(
    'DRAFT',
    'PENDING_REVIEW',
    'PUBLISHED',
    'ARCHIVED'
);

CREATE TABLE IF NOT EXISTS documents(
    id UUID PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    file_url TEXT NOT NULL,
    status document_status NOT NULL DEFAULT 'DRAFT',
    author_id UUID NOT NULL,
    project_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_documents_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_author
        FOREIGN KEY(author_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);
