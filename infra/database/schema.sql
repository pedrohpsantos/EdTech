CREATE TYPE user_role AS ENUM ( 'RESEARCHER', 'ADVISOR', 'AUDITOR' );
CREATE TABLE IF NOT EXISTS users
    (
        id            UUID PRIMARY KEY                            ,
        name          VARCHAR(120) NOT NULL                       ,
        email         VARCHAR(180) NOT NULL UNIQUE                ,
        password_hash VARCHAR(255) NOT NULL                       ,
        role user_role NOT NULL                                   ,
        active     BOOLEAN NOT NULL DEFAULT TRUE                  ,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    )
;
CREATE TYPE acao_auditoria AS ENUM ( 'LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT', 'REGISTER' );
CREATE TABLE IF NOT EXISTS audit_logs
    (
        id      UUID PRIMARY KEY           ,
        user_id UUID NOT NULL              ,
        action acao_auditoria NOT NULL     ,
        resource_type VARCHAR(255) NOT NULL,
        resource_id   UUID NOT NULL        ,
        ip_address    VARCHAR(45) NOT NULL ,
        details       TEXT                 ,
        created_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    )
;
CREATE TABLE IF NOT EXISTS projects
    (
        id          UUID PRIMARY KEY                               ,
        title       VARCHAR(120) NOT NULL                          ,
        description TEXT NOT NULL                                  ,
        advisor_id  UUID                                           ,
        created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_advisor FOREIGN KEY(advisor_id) REFERENCES users(id) ON
        DELETE
        SET
            NULL );
CREATE TYPE project_role AS ENUM ( 'ADVISOR', 'RESEARCHER' );
CREATE TABLE IF NOT EXISTS project_members
    (
        id         UUID PRIMARY KEY                              ,
        project_id UUID                                          ,
        role project_role NOT NULL                               ,
        user_id   UUID                                           ,
        joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        CONSTRAINT uq_project_user UNIQUE (project_id, user_id)  ,
        CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(id) ON
        DELETE
            CASCADE
            ,
            CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON
        DELETE
            CASCADE );
CREATE TYPE document_status as ENUM( 'DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED' );
CREATE TABLE IF NOT EXISTS documents
    (
        id       UUID PRIMARY KEY                                 ,
        title    VARCHAR(120) NOT NULL                            ,
        file_url TEXT NOT NULL                                    ,
        status document_status NOT NULL DEFAULT 'DRAFT'           ,
        author_id  UUID NOT NULL                                  ,
        project_id UUID NOT NULL                                  ,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_documents_project FOREIGN KEY (project_id) REFERENCES projects(id) ON
        DELETE
            CASCADE
            ,
            CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES users(id) ON
        DELETE
        SET
            NULL );
REVOKE UPDATE,
DELETE
    ON TABLE audit_logs
FROM
    edtech_user;
CREATE
OR
REPLACE FUNCTION prevent_audit_logs_delete() RETURNS TRIGGER AS $$
BEGIN RAISE EXCEPTION 'Não é permitido excluir conteúdos da tabela audit_logs.';
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_prevent_audit_logs_delete
BEFORE DELETE
ON audit_logs
FOR EACH ROW EXECUTE FUNCTION prevent_audit_logs_delete();
CREATE
OR
REPLACE FUNCTION prevent_audit_logs_update() RETURNS TRIGGER AS $$
BEGIN RAISE EXCEPTION 'Não é permitido modificar a tabela audit_logs.';
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_prevent_audit_logs_update
BEFORE UPDATE
ON audit_logs
FOR EACH ROW EXECUTE FUNCTION prevent_audit_logs_update();
CREATE CAST (character varying AS user_role) WITH INOUT AS IMPLICIT;
CREATE CAST (character varying AS acao_auditoria) WITH INOUT AS IMPLICIT;
CREATE CAST (character varying AS project_role) WITH INOUT AS IMPLICIT;
CREATE CAST (character varying AS document_status) WITH INOUT AS IMPLICIT;