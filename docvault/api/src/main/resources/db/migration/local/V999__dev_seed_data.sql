-- Arquivo de Seed para ambiente de Desenvolvimento (Local/Docker)
-- Insere usuários de teste se não existirem
INSERT INTO users (id, name, email, password_hash, role, active, created_at, updated_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Orientador Teste', 'orientador@edtech.com', '$2a$10$Htk/oRMu98fn/x5B5nD0LuEqAT5lpv6sBdFK2FlhLchPIxY1y/Dj2', 'ADVISOR', true, NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', 'Aluno Teste', 'aluno@edtech.com', '$2a$10$Htk/oRMu98fn/x5B5nD0LuEqAT5lpv6sBdFK2FlhLchPIxY1y/Dj2', 'RESEARCHER', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insere um projeto de teste
INSERT INTO projects (id, title, description, advisor_id, created_at, updated_at)
VALUES 
    ('33333333-3333-3333-3333-333333333333', 'Projeto Modelo Integrado', 'Este é um projeto gerado automaticamente para testes em ambiente de desenvolvimento.', '11111111-1111-1111-1111-111111111111', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Associa o aluno ao projeto
INSERT INTO project_members (id, project_id, user_id, role, joined_at)
VALUES 
    ('44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'RESEARCHER', NOW())
ON CONFLICT (id) DO NOTHING;
