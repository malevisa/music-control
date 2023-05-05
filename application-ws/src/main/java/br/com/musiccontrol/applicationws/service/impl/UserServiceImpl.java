package br.com.musiccontrol.applicationws.service.impl;

import br.com.musiccontrol.applicationws.configurations.exceptions.NotFoundException;
import br.com.musiccontrol.applicationws.configurations.exceptions.UserExistsException;
import br.com.musiccontrol.applicationws.controller.dto.request.EditUserRequestDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.LoginRequestDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.RecoverUserDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.UserRequestDTO;
import br.com.musiccontrol.applicationws.domain.User;
import br.com.musiccontrol.applicationws.repository.UserRepository;
import br.com.musiccontrol.applicationws.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserRequestDTO user) {
        if(userRepository.findByEmail(user.getEmail()).isPresent() ||
                userRepository.findByLoginAndIsDeletedFalse(user.getLogin()).isPresent()) {
            throw new UserExistsException("Usuário existente ou e-mail já utilizado");
        }

         User userCreated = userRepository.save(
                new User(
                        user.getUsername(),
                        user.getLogin(),
                        user.getEmail(),
                        passwordEncoder.encode(user.getPassword()),
                        false
                )
        );

        UserDetails userDetails = loadUserByUsername(userCreated.getLogin());

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                )
        );

        return userCreated;
    }

    @Override
    public User login(LoginRequestDTO login) {

        UserDetails userDetails = loadUserByUsername(login.getLogin());
        boolean match = passwordEncoder.matches(login.getPassword(), userDetails.getPassword());

        if(match) {
            Optional<User> userOptional = userRepository.findByLoginAndIsDeletedFalse(login.getLogin());

            if (userOptional.isEmpty() || userOptional.get().getDeleted()) {
                throw new NotFoundException("Usuário não foi encontrado ou credenciais inválidas.");
            } else {
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        )
                );

                return new User(
                        userOptional.get().getIdUser(),
                        userOptional.get().getUsername(),
                        userOptional.get().getLogin(),
                        userOptional.get().getEmail(),
                        userOptional.get().getPassword(),
                        userOptional.get().getDeleted()
                );
            }

        }

        throw new NotFoundException("Usuario não encontrado.");

    }

    @Override
    public String logoff() {

        SecurityContextHolder.clearContext();

        return "Logoff do usuário feito com sucesso.";
    }

    @Override
    public User editUser(Long idUser, EditUserRequestDTO user) {
        Optional<User> userOptional = userRepository.findByIdUserAndIsDeletedFalse(idUser);

        if (userOptional.isPresent()) {
            User foundUser = userOptional.get();

            if (userRepository.findByEmailAndIdUserNot(user.getEmail(), idUser).isPresent() ||
                    userRepository.findByLoginAndIdUserNot(user.getLogin(), idUser).isPresent()) {
                throw new UserExistsException("Login ou e-mail já utilizados.");
            }

            foundUser.setUsername(user.getUsername());
            foundUser.setLogin(user.getLogin());
            foundUser.setEmail(user.getEmail());
//            foundUser.setPassword(passwordEncoder.encode(user.getPassword()));

            userRepository.save(foundUser);

            return foundUser;

        }

        throw new NotFoundException("Usuário não encontrado.");
    }

    @Override
    public User recoverUser(RecoverUserDTO recoverUserDTO) {

        Optional<User> optionalUser = userRepository.findByLoginAndEmailAndIsDeletedTrue(recoverUserDTO.getLogin(), recoverUserDTO.getEmail());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            user.setDeleted(false);

            return userRepository.save(user);
        }

        throw new NotFoundException("Usuário não encontrado!");
    }

    @Override
    public String deleteUser(Long idUser) {

        Optional<User> user = userRepository.findByIdUserAndIsDeletedFalse(idUser);

        if(user.isPresent()) {

            logoff();

            user.get().setDeleted(true);

            userRepository.save(user.get());

            return "Usuário excluído com sucesso!";
        }

        throw new NotFoundException("Não foi possível deletar a conta, usuário não encontrado.");

    }

    @Override
    public UserDetails loadUserByUsername(String username) {

        Optional<User> loggedUser = userRepository.findByLoginAndIsDeletedFalse(username);

        if(loggedUser.isEmpty()){
            throw new NotFoundException("Usuário não foi encontrado.");
        }

        User user = loggedUser.get();

        String roles = "USER";

        return org.springframework.security.core.userdetails.User.
                builder()
                .username(user.getLogin())
                .password(user.getPassword())
                .roles(roles)
                .build();
    }
}
