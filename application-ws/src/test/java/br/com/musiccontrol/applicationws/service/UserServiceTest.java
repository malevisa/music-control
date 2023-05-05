package br.com.musiccontrol.applicationws.service;

import br.com.musiccontrol.applicationws.configurations.exceptions.NotFoundException;
import br.com.musiccontrol.applicationws.configurations.exceptions.UserExistsException;
import br.com.musiccontrol.applicationws.controller.dto.request.EditUserRequestDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.LoginRequestDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.RecoverUserDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.UserRequestDTO;
import br.com.musiccontrol.applicationws.domain.User;
import br.com.musiccontrol.applicationws.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    @DisplayName("createUser(), funciona corretamente.")
    void createUser() {

        UserRequestDTO userRequest = new UserRequestDTO(
                "Primeiro usuário de teste",
                "teste",
                "teste@createuser.com",
                "Teste123"
        );

        assertNotNull(
                userService.createUser(
                    userRequest
                )
        );

    }

    @Test
    @DisplayName("createUser(), login já utilizado por outro usuário, gera UserExistsException.")
    void createUserAlreadyExistsInvalidLogin() {

        UserRequestDTO userRequest = new UserRequestDTO(
                "Segundo usuário de teste",
                "segundoTeste",
                "teste@createuserinvalidlogin.com",
                "Teste123"
        );

        assertNotNull(
                userService.createUser(
                        userRequest
                )
        );

        userRequest.setEmail("teste@gmail.com");
        assertThrows(
                UserExistsException.class,
                () -> userService.createUser(
                        userRequest
                )
        );

    }

    @Test
    @DisplayName("createUser(), e-mail já utilizado por outro usuário, gera UserExistsException.")
    void createUserAlreadyExistsInvalidEmail() {

        UserRequestDTO userRequest = new UserRequestDTO(
                "Terceiro usuário de teste",
                "terceiroTeste",
                "teste@createuserinvalidemail.com",
                "Teste123"
        );

        assertNotNull(
                userService.createUser(
                        userRequest
                )
        );

        userRequest.setLogin("quartoTeste");
        assertThrows(
                UserExistsException.class,
                () -> userService.createUser(
                        userRequest
                )
        );

    }

    @Test
    @DisplayName("login(), funciona corretamente.")
    void login() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Quarto usuário de teste",
                        "quartoTeste",
                        "teste@login.com",
                        "Teste123"
                )
        );

        LoginRequestDTO loginRequest = new LoginRequestDTO(
                firstUser.getLogin(),
                "Teste123"
        );

        assertNotNull(
                userService.login(
                        loginRequest
                )
        );

    }

    @Test
    @DisplayName("login(), login não cadastrado na banco de dados, gera NotFoundException.")
    void loginNoExists() {

        LoginRequestDTO loginRequest = new LoginRequestDTO(
                "login inválido",
                "Teste123"
        );

        assertThrows(
                NotFoundException.class,
                () -> userService.login(
                        loginRequest
                )
        );

    }

    @Test
    @DisplayName("login(), login correto, porém senha inválida, gera NotFoundException.")
    void loginInvalidPassword() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Quinto usuário de teste",
                        "quintoTeste",
                        "teste@logininvalidpassword.com",
                        "Teste123"
                )
        );

        LoginRequestDTO loginRequest = new LoginRequestDTO(
                firstUser.getLogin(),
                "123"
        );

        assertThrows(
                NotFoundException.class,
                () -> userService.login(
                        loginRequest
                )
        );

    }

    @Test
    @DisplayName("editUser(), funciona corretamente.")
    void editUser() {

        UserRequestDTO userRequest = new UserRequestDTO(
                "Sexto usuário de teste",
                "sextoTeste",
                "teste@editUser.com",
                "Teste123"
        );

        User firstUser = userService.createUser(
                userRequest
        );

        userRequest.setUsername("Sexto usuário de teste atualizado");
        userRequest.setLogin("sextoTesteAtualizado");

        assertNotEquals(
                firstUser,
                userService.editUser(
                        firstUser.getIdUser(),
                        new EditUserRequestDTO(
                                "Sexto usuário de teste",
                                "sextoTeste",
                                "teste@editUser.com"
                        )
                )
        );

    }

    @Test
    @DisplayName("editUser(), usuário não encontrado no banco de dados, gera NotFoundException.")
    void editUserNotFound() {

        UserRequestDTO userRequest = new UserRequestDTO(
                "Sétimo usuário de teste",
                "setimoTeste",
                "teste@editusernotfound.com",
                "Teste123"
        );

        assertThrows(
                NotFoundException.class,
                () -> userService.editUser(
                        100L,
                        new EditUserRequestDTO(
                                "Sétimo usuário de teste",
                                "setimoTeste",
                                "teste@editusernotfound.com"
                        )
                )
        );

    }

    @Test
    @DisplayName("editUser(), e-mail e/ou login já utilizado por outros usuários, gera UserExistsException.")
    void editUserInvalidEmailAndLogin() {

        UserRequestDTO firstUserRequest = new UserRequestDTO(
                "Oitavo usuário de teste",
                "oitavoTeste",
                "teste@edituserinvalidemail.com",
                "Teste123"
        );

        UserRequestDTO secondUserRequest = new UserRequestDTO(
                "Nono usuário de teste",
                "nonoTeste",
                "teste@edituserinvalidlogin.com",
                "Teste123"
        );

        User firstUser = userService.createUser(
                firstUserRequest
        );

        User secondUser = userService.createUser(
                secondUserRequest
        );

        firstUserRequest.setUsername("Oitavo Usuário de teste atualizado");
        firstUserRequest.setLogin("nonoTeste");

        assertThrows(
                UserExistsException.class,
                () -> userService.editUser(
                        firstUser.getIdUser(),
                        new EditUserRequestDTO(
                                firstUserRequest.getUsername(),
                                firstUserRequest.getLogin(),
                                firstUserRequest.getEmail()
                        )
                )
        );

        secondUserRequest.setUsername("Nono Usuário de teste atualizado");
        secondUserRequest.setEmail("teste@edituserinvalidemail.com");

        assertThrows(
                UserExistsException.class,
                () -> userService.editUser(
                        secondUser.getIdUser(),
                        new EditUserRequestDTO(
                                secondUserRequest.getUsername(),
                                secondUserRequest.getLogin(),
                                secondUserRequest.getEmail()
                        )
                )
        );

    }

    @Test
    @DisplayName("deleteUser(), funciona corretamente.")
    void deleteUser() {

        UserRequestDTO firstUserRequest = new UserRequestDTO(
                "Décimo usuário de teste",
                "decimoTeste",
                "teste@deleteuser.com",
                "Teste123"
        );

        User firstUser = userService.createUser(
                firstUserRequest
        );

        assertNotNull(
                userService.deleteUser(
                        firstUser.getIdUser()
                )
        );

    }

    @Test
    @DisplayName("deleteUser(), id não encontrado na base, gera NotFoundException.")
    void deleteUserNoExists() {

        assertThrows(
                NotFoundException.class,
                () -> userService.deleteUser(
                        100L
                )
        );
    }

    @Test
    @DisplayName("recoverUser(), funciona corretamente.")
    void recoverUser() {

        UserRequestDTO firstUserRequest = new UserRequestDTO(
                "Décimo primeiro usuário de teste",
                "decimoPrimeiroTeste",
                "teste@recoveruser.com",
                "Teste123"
        );

        User firstUser = userService.createUser(
                firstUserRequest
        );

        userService.deleteUser(firstUser.getIdUser());

        assertNotNull(
                userService.recoverUser(
                        new RecoverUserDTO(
                                firstUserRequest.getLogin(),
                                firstUserRequest.getEmail()
                        )
                )
        );

    }

    @Test
    @DisplayName("recoverUser(), o usuário não foi deletado e por isso não foi encontrados, gera NotFoundException.")
    void recoverUserUserNotDeleted() {

        UserRequestDTO firstUserRequest = new UserRequestDTO(
                "Décimo segundo usuário de teste",
                "decimoSegundoTeste",
                "teste@recoverUserFailed.com",
                "Teste123"
        );

        userService.createUser(firstUserRequest);

        assertThrows(NotFoundException.class,
                () -> userService.recoverUser(
                        new RecoverUserDTO(
                                firstUserRequest.getLogin(),
                                firstUserRequest.getEmail()
                        )
                )
        );

    }

}
