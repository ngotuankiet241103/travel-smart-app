package com.course_platform.courses.exception;

import com.cloudinary.api.exceptions.BadRequest;
import com.course_platform.courses.dto.response.ApiResponse;
import jakarta.validation.UnexpectedTypeException;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.nio.file.AccessDeniedException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = CustomRuntimeException.class)
    ResponseEntity<ApiResponse> handleAppException(CustomRuntimeException exception){

        ErrorCode errorCode = exception.getErrorCode();
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
    @ExceptionHandler(value = UnexpectedTypeException.class)
    ResponseEntity<ApiResponse> handleUnexpectedTypeException(UnexpectedTypeException exception){
        String message = exception.getMessage();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.builder()
                        .code(1005)
                        .message(message)
                        .build());
    }
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handleNotValidException(MethodArgumentNotValidException exception){
        String member  = exception.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.valueOf(member);
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
    @ExceptionHandler(value = HttpClientErrorException.Forbidden.class)
    ResponseEntity<ApiResponse> handleNotForbidden(MethodArgumentNotValidException exception){

        ErrorCode errorCode = ErrorCode.FORBIDDEN;
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
    @ExceptionHandler(value = HttpClientErrorException.Unauthorized.class)
    ResponseEntity<ApiResponse> handleUnauthorized(MethodArgumentNotValidException exception){

        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
    @ExceptionHandler(value = AuthenticationException.class)
    ResponseEntity<ApiResponse> handleUnauthorizedDenied(AuthenticationException exception){
        System.out.println("123");
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
    @ExceptionHandler(value = NoResourceFoundException.class)
    ResponseEntity<ApiResponse> handleRssNotFound(NoResourceFoundException exception){
        System.out.println(exception.getMessage());
        ErrorCode errorCode = ErrorCode.RESOURCE_NOT_FOUND;
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
    ResponseEntity<ApiResponse> handleUnsupportedMethod(HttpRequestMethodNotSupportedException exception){
        ErrorCode errorCode = ErrorCode.UNSUPPORTED_METHOD;
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
    @ExceptionHandler(value = HttpClientErrorException.BadRequest.class)
    ResponseEntity<ApiResponse> handleBadRequest(BadRequest exception){
        ErrorCode errorCode = ErrorCode.BAD_REQUEST;
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
}
