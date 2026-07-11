ALTER TABLE users ADD COLUMN deleted BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS verification_tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(6) NOT NULL,
    email VARCHAR(180) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_verification_tokens_email_token ON verification_tokens (email, token);
