package br.com.musiccontrol.applicationws.configurations.handler;

import br.com.musiccontrol.applicationws.configurations.exceptions.NotFoundException;
import br.com.musiccontrol.applicationws.configurations.exceptions.UserExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestControllerAdvice
public class ExceptionGlobalHandler {

    @Autowired
    private MessageSource messageSource;

    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public List<ValidationErrorDTO> methodArgumentNotValidHandle(MethodArgumentNotValidException exception) {
        List<ValidationErrorDTO> dto = new ArrayList<>();
        List<FieldError> fieldErrorList = exception.getBindingResult().getFieldErrors();

        fieldErrorList.forEach(e -> {
            String message = messageSource.getMessage(e, LocaleContextHolder.getLocale());
            ValidationErrorDTO errorDto = new ValidationErrorDTO(
                    e.getField(),
                    message
            );
            dto.add(errorDto);
        });

        return dto;

    }

    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public ErrorDTO notFoundHandle(NotFoundException exception) {

        return new ErrorDTO(exception.getMessage(), Arrays.toString(exception.getStackTrace()));

    }

    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(UserExistsException.class)
    public ErrorDTO userExistsHandle(UserExistsException exception) {

        return new ErrorDTO(exception.getMessage(), Arrays.toString(exception.getStackTrace()));

    }

}
