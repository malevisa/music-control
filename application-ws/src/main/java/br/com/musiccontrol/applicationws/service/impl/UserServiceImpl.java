package br.com.musiccontrol.applicationws.service.impl;

import br.com.musiccontrol.applicationws.configurations.exceptions.NotFoundException;
import br.com.musiccontrol.applicationws.configurations.exceptions.UserExistsException;
import br.com.musiccontrol.applicationws.controller.dto.request.LoginRequestDTO;
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
        if(userRepository.findByEmail(user.getEmail()) != null || userRepository.findByLogin(user.getLogin()).isPresent()) {
            throw new UserExistsException("Usuário existente");
        }

        return userRepository.save(
                new User(
                        user.getUsername(),
                        user.getLogin(),
                        user.getEmail(),
                        passwordEncoder.encode(user.getPassword())
                )
        );
    }

    @Override
    public User login(LoginRequestDTO login) {

        UserDetails userDetails = loadUserByUsername(login.getLogin());
        boolean match = passwordEncoder.matches(login.getPassword(), userDetails.getPassword());

        if(match) {
            Optional<User> userOptional = userRepository.findByLogin(login.getLogin());

            if (userOptional.isEmpty()) {
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
                        userOptional.get().getPassword()
                );
            }

        }

        throw new UserExistsException("Usuario não encontrado.");

    }

    @Override
    public String logoff() {

        SecurityContextHolder.clearContext();

        return "Logoff do usuário feito com sucesso.";
    }

    @Override
    public User editUser(Long idUser, UserRequestDTO user) {
        Optional<User> userOptional = userRepository.findById(idUser);

        if (userOptional.isPresent()) {
            User foundUser = userOptional.get();

            if (userRepository.findByEmailAndIdUserNot(user.getEmail(), idUser).isPresent() ||
                    userRepository.findByLoginAndIdUserNot(user.getLogin(), idUser).isPresent()) {
                throw new UserExistsException("Login ou e-mail já utilizados.");
            }

            foundUser.setUsername(user.getUsername());
            foundUser.setLogin(user.getLogin());
            foundUser.setEmail(user.getEmail());
            foundUser.setPassword(user.getPassword());

            userRepository.save(foundUser);

            return foundUser;

        }

        throw new NotFoundException("Usuário não encontrado.");
    }

    @Override
    public String deleteUser(Long idUser) {

        Optional<User> user = userRepository.findById(idUser);

        if(user.isPresent()) {

            SecurityContextHolder.clearContext();

            userRepository.deleteById(idUser);

            return "Usuário excluído com sucesso!";
        }

        throw new NotFoundException("Não foi possível deletar a conta, usuário não encontrado.");

    }

    @Override
    public UserDetails loadUserByUsername(String username) {

        Optional<User> loggedUser = userRepository.findByLogin(username);

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
