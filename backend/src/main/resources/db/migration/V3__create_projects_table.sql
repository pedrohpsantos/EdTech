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