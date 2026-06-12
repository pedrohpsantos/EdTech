CREATE TABLE IF NOT EXISTS project_members(
    project_id UUID,
    user_id UUID,
    PRIMARY KEY (project_id, user_id),
    CONSTRAINT fk_project
        FOREIGN KEY(project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,
    CONSTRAINT  fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
