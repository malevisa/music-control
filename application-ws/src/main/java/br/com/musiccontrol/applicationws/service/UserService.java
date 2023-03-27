package br.com.musiccontrol.applicationws.service;

import br.com.musiccontrol.applicationws.controller.dto.request.LoginRequestDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.RecoverUserDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.UserRequestDTO;
import br.com.musiccontrol.applicationws.domain.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    User createUser(UserRequestDTO user);

    User login(LoginRequestDTO login);

    String logoff();

    User editUser(Long idUser, UserRequestDTO user);

    String deleteUser(Long idUser);

    @Override
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    User recoverUser(RecoverUserDTO recoverUserDTO);
}
