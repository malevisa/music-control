package br.com.musiccontrol.applicationws.configurations.exceptions;

public class NotFoundException extends RuntimeException {

    private StackTraceElement[] stacktrace;

    public NotFoundException(String message) {
        super(message);
    }

}
