package com.docvault.service;

public class InvalidInstitutionalEmailException extends RuntimeException {

    public InvalidInstitutionalEmailException(String message) {
        super(message);
    }
}
