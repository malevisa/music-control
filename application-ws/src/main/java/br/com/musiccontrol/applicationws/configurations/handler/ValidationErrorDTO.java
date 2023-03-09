package br.com.musiccontrol.applicationws.configurations.handler;

public class ValidationErrorDTO {

    private String campo;
    private String message;

    public ValidationErrorDTO(String campo, String message) {
        this.campo = campo;
        this.message = message;
    }

    public String getCampo() {
        return campo;
    }

    public String getMessage() {
        return message;
    }
}
