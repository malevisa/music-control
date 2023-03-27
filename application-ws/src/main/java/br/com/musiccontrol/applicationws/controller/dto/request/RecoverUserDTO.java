package br.com.musiccontrol.applicationws.controller.dto.request;

public class RecoverUserDTO {

    private String login;
    private String email;

    public RecoverUserDTO(String login, String email) {
        this.login = login;
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
