package br.com.musiccontrol.applicationws.controller.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class EditUserRequestDTO {

    @NotBlank(message = "Nome obrigatório")
    private String username;

    @NotBlank(message = "Login obrigatório")
    @Size(min = 8, max = 40)
    private String login;

    @NotBlank(message = "Email obrigatório")
    @Email
    private String email;

    public EditUserRequestDTO() {
    }

    public EditUserRequestDTO(String username, String login, String email) {
        this.username = username;
        this.login = login;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
