CREATE TABLE recovery_tokens
    (
        id          BIGSERIAL PRIMARY KEY,
        token       VARCHAR(255) NOT NULL,
        email       VARCHAR(255) NOT NULL,
        expiry_date TIMESTAMP NOT NULL
    );