CREATE TABLE document_comments
    (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        document_id UUID NOT NULL REFERENCES documents(id) ON
        DELETE
            CASCADE
            ,
            author_id UUID NOT NULL REFERENCES users(id) ON
        DELETE
            CASCADE
            ,
            content TEXT NOT NULL
            ,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL );
CREATE INDEX idx_document_comments_document_id
ON document_comments
    (
        document_id
    )
;
CREATE INDEX idx_document_comments_created_at
ON document_comments
    (
        created_at
    );