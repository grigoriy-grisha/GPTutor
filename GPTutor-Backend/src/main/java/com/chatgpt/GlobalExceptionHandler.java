package com.chatgpt;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.Exceptions.NotAFoundException;
import com.chatgpt.Exceptions.TooManyRequestsExceptions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    static class ErrorResponse {
        private final int status;
        private final String error;

        public ErrorResponse(HttpStatus status, String error) {
            this.status = status.value();
            this.error = error;
        }

        public int getStatus() {
            return status;
        }

        public String getError() {
            return error;
        }
    }
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handleBadRequestException(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }

    @ExceptionHandler(NotAFoundException.class)
    public ResponseEntity<?> handleNotAFoundException(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage()));
    }

    @ExceptionHandler(TooManyRequestsExceptions.class)
    public ResponseEntity<?> handleTooManyRequestsExceptions(TooManyRequestsExceptions ex) {
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(new ErrorResponse(HttpStatus.TOO_MANY_REQUESTS, ex.getMessage()));
    }
}
