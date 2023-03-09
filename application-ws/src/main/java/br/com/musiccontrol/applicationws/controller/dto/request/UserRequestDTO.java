package br.com.musiccontrol.applicationws.controller.dto.request;

//import jakarta.validation.constraints.NotBlank;

import javax.validation.constraints.NotBlank;

public class UserRequestDTO {

    @NotBlank(message = "Nome obrigatório")
    private String username;

    @NotBlank(message = "Login obrigatório")
    private String login;

    @NotBlank(message = "Email obrigatório")
    private String email;

    @NotBlank(message = "Senha obrigatória")
    private String password;

    public UserRequestDTO() {
    }

    public UserRequestDTO(String username, String login, String email, String password) {
        this.username = username;
        this.login = login;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getLogin() {
        return login;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
