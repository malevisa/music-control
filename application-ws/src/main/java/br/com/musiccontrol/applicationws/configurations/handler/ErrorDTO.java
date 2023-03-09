package br.com.musiccontrol.applicationws.configurations.handler;

public class ErrorDTO {

    private String message;
    private String stacktrace;

    public ErrorDTO(String message, String stacktrace) {
        this.message = message;
        this.stacktrace = stacktrace;
    }

    public String getMessage() {
        return message;
    }

    public String getStacktrace() {
        return stacktrace;
    }
}
