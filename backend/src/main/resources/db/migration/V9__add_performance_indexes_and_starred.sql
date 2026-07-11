-- Adicionar coluna 'starred' (Favoritos) na tabela de documentos
ALTER TABLE documents ADD COLUMN starred BOOLEAN DEFAULT false NOT NULL;

-- Criar Índices de Performance em chaves estrangeiras que são usadas para filtro constante
CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_documents_author_id ON documents(author_id);
CREATE INDEX idx_projects_advisor_id ON projects(advisor_id);
