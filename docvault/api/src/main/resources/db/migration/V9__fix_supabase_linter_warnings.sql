-- Fix unindexed_foreign_keys for documents
CREATE INDEX IF NOT EXISTS idx_documents_author_id ON documents(author_id);
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON documents(project_id);

-- Fix unindexed_foreign_keys for projects
CREATE INDEX IF NOT EXISTS idx_projects_advisor_id ON projects(advisor_id);

-- Fix unindexed_foreign_keys for project_members
CREATE INDEX IF NOT EXISTS idx_project_members_user_id ON project_members(user_id);

-- Fix function_search_path_mutable by setting an explicit search_path
ALTER FUNCTION prevent_audit_logs_delete() SET search_path = public;
ALTER FUNCTION prevent_audit_logs_update() SET search_path = public;
