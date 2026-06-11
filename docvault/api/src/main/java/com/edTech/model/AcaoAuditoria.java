package com.edTech.model;

public enum AcaoAuditoria {
    LOGIN_SUCCESS, // — após login bem-sucedido
    LOGIN_FAILED, // — após tentativa com senha errada
    LOGOUT, // — ao limpar o cookie
    REGISTER // — ao criar nova conta
}
