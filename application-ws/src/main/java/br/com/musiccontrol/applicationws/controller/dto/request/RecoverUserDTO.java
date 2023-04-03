package br.com.musiccontrol.applicationws.controller.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RecoverUserDTO {

    @NotBlank(message = "Login obrigatório.")
    @Size(min = 8, max = 40)
    private String login;

    @NotBlank(message = "E-mail obrigatório.")
    @Size(min = 8, max = 30)
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
