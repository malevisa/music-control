package br.com.musiccontrol.applicationws.controller.dto.request;

//import jakarta.validation.constraints.NotBlank;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginRequestDTO {

    @NotBlank(message = "Favor informar o login.")
    @Size(min = 8, max = 40)
    private String login;

    @NotBlank(message = "Favor informar a senha.")
    @Size(min = 8, max = 30)
    private String password;

    public LoginRequestDTO(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
