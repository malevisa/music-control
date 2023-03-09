package br.com.musiccontrol.applicationws.controller.dto.request;

//import jakarta.validation.constraints.NotBlank;

import javax.validation.constraints.NotBlank;

public class LoginRequestDTO {

    @NotBlank(message = "Favor informar o login.")
    private String login;

    @NotBlank(message = "Favor informar a senha.")
    private String password;

    public LoginRequestDTO(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

}
