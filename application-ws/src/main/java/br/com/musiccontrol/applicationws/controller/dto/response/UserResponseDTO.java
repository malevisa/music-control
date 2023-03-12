package br.com.musiccontrol.applicationws.controller.dto.response;

public class UserResponseDTO {

    private Long idUser;
    private String username;
    private String login;
    private String email;
    private Boolean isDeleted;

    public UserResponseDTO(Long idUser, String username, String login, String email, Boolean isDeleted) {
        this.idUser = idUser;
        this.username = username;
        this.login = login;
        this.email = email;
        this.isDeleted = isDeleted;
    }

    public UserResponseDTO() {
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
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

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
