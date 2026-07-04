
REVOKE UPDATE, DELETE ON TABLE audit_logs FROM edtech_user;

CREATE OR REPLACE FUNCTION prevent_audit_logs_delete()
    RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Não é permitido excluir conteúdos da tabela audit_logs.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_audit_logs_delete
    BEFORE DELETE ON audit_logs
    FOR EACH ROW EXECUTE FUNCTION prevent_audit_logs_delete();


CREATE OR REPLACE FUNCTION prevent_audit_logs_update()
    RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Não é permitido modificar a tabela audit_logs.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_audit_logs_update
    BEFORE UPDATE ON audit_logs
    FOR EACH ROW EXECUTE FUNCTION prevent_audit_logs_update();
