package com.chatgpt.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
public class TooManyRequestsExceptions extends RuntimeException {
    public TooManyRequestsExceptions(String message) {
        super(message);

    }
}