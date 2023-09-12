package com.chatgpt;

import com.chatgpt.Exceptions.BadRequestException;
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
    public ResponseEntity<?> handleCustomException(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }
}
