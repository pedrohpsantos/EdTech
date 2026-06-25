package com.edTech.model;

public enum AcaoAuditoria {
    LOGIN_SUCCESS,       // — após login bem-sucedido
    LOGIN_FAILED,        // — após tentativa com senha errada
    LOGOUT,              // — ao limpar o cookie
    REGISTER,            // — ao criar nova conta
    UPLOAD_SUCCESS,      // — upload de documento concluído
    UPLOAD_FAILED,       // — falha no upload de documento
    DOWNLOAD,            // — download de documento
    DELETE_DOCUMENT,     // — exclusão de documento
    REVIEW_DOCUMENT,     // - revisão de documento
    DOCUMENT_APPROVED,   // — orientador aprovou o documento
    DOCUMENT_REJECTED,   // — orientador rejeitou o documento
    MEMBER_JOINED        // — membro adicionado ou associado ao projeto
}
