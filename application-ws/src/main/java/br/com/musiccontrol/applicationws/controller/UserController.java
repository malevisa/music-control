package br.com.musiccontrol.applicationws.controller;

import br.com.musiccontrol.applicationws.controller.dto.request.LoginRequestDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.RecoverUserDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.UserRequestDTO;
import br.com.musiccontrol.applicationws.controller.dto.response.UserResponseDTO;
import br.com.musiccontrol.applicationws.domain.User;
import br.com.musiccontrol.applicationws.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create-user")
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody @Valid UserRequestDTO user) {

        User result = userService.createUser(user);

        return ResponseEntity.status(201).body(
                new UserResponseDTO(
                        result.getIdUser(),
                        result.getUsername(),
                        result.getLogin(),
                        result.getEmail(),
                        result.getDeleted()
                )
        );
    }

    @GetMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody @Valid LoginRequestDTO login) {

        User user = userService.login(login);

        return ResponseEntity.status(200).body(
                new UserResponseDTO(
                        user.getIdUser(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getLogin(),
                        user.getDeleted()
                )
        );
    }

    @PostMapping("/logoff")
    public ResponseEntity<String> logoff() {

        String message = userService.logoff();

        return ResponseEntity.status(200).body(message);

    }

    @PutMapping("/recover-user")
    public ResponseEntity<UserResponseDTO> recoverUser(@RequestBody RecoverUserDTO recoverUserDTO) {

        User userOptional = userService.recoverUser(recoverUserDTO);

        return ResponseEntity.status(200).body(
                new UserResponseDTO(
                        userOptional.getIdUser(),
                        userOptional.getUsername(),
                        userOptional.getLogin(),
                        userOptional.getEmail(),
                        userOptional.getDeleted()
                )
        );
    }

    @PutMapping("/edit-user/{idUser}")
    public ResponseEntity<UserResponseDTO> editUser(@PathVariable Long idUser, @RequestBody @Valid UserRequestDTO user) {

        User userOptional = userService.editUser(idUser, user);

        return ResponseEntity.status(200).body(
                new UserResponseDTO(
                        userOptional.getIdUser(),
                        userOptional.getUsername(),
                        userOptional.getLogin(),
                        userOptional.getEmail(),
                        userOptional.getDeleted()
                )
        );
    }

    @DeleteMapping("/delete-user/{idUser}")
    public ResponseEntity<String> deleteUser(@PathVariable Long idUser) {

        String message = userService.deleteUser(idUser);

        return ResponseEntity.status(200).body(message);
    }

}
