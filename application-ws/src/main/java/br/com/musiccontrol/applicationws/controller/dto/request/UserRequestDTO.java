package br.com.musiccontrol.applicationws.controller.dto.request;

import javax.validation.constraints.Size;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserRequestDTO {

    @NotBlank(message = "Nome obrigatório")
    private String username;

    @NotBlank(message = "Login obrigatório")
    @Size(min = 8, max = 40)
    private String login;

    @NotBlank(message = "Email obrigatório")
    @Email
    private String email;

    @NotBlank(message = "Senha obrigatória")
    @Size(min = 8, max = 30)
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return String.format(
                "UserRequestDTO -> { \n" +
                        "username: %s \n" +
                        "login: %s \n" +
                        "email: %s \n" +
                        "password: %s \n" +
                        "}",
                this.username,
                this.login,
                this.email,
                this.password
        );
    }
}
