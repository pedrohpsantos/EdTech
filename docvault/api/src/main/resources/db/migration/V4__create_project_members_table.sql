CREATE TYPE project_role AS ENUM (
    'ADVISOR',
    'RESEARCHER'
);


CREATE TABLE IF NOT EXISTS project_members(
    id UUID PRIMARY KEY,
    project_id UUID,
    role project_role NOT NULL,
    user_id UUID,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_project_user UNIQUE (project_id, user_id),
    CONSTRAINT fk_project
        FOREIGN KEY(project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,
    CONSTRAINT  fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
