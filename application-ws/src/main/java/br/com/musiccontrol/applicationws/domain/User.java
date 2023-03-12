package br.com.musiccontrol.applicationws.domain;

//import jakarta.persistence.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    private String username;
    private String login;
    private String email;
    private String password;
    private Boolean isDeleted;

    public User(String username, String login, String email, String password, Boolean isDeleted) {
        this.username = username;
        this.login = login;
        this.email = email;
        this.password = password;
        this.isDeleted = isDeleted;
    }

    public User(Long idUser, String username, String login, String email, String password, Boolean isDeleted) {
        this.idUser = idUser;
        this.username = username;
        this.login = login;
        this.email = email;
        this.password = password;
        this.isDeleted = isDeleted;
    }

    public User() {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
