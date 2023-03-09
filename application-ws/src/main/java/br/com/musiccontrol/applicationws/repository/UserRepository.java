package br.com.musiccontrol.applicationws.repository;

import br.com.musiccontrol.applicationws.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);

    Optional<User> findByLoginAndPassword(String login, String password);

    Optional<User> findByLogin(String username);

    Optional<User> findByEmailAndIdUserNot(String email, Long idUser);

    Optional<User> findByLoginAndIdUserNot(String login, Long idUser);
}
