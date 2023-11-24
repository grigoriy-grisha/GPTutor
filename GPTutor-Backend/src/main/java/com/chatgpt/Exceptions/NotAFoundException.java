package com.chatgpt.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotAFoundException extends RuntimeException {
    public NotAFoundException(String message) {
        super(message);

    }
}