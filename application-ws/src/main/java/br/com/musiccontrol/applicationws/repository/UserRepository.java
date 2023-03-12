package br.com.musiccontrol.applicationws.repository;

import br.com.musiccontrol.applicationws.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmailAndIdUserNot(String email, Long idUser);

    Optional<User> findByLoginAndIdUserNot(String login, Long idUser);

    Optional<User> findByIdUserAndIsDeletedFalse(Long idUser);

    boolean existsByIdUserAndIsDeletedFalse(Long idUser);

    Optional<User> findByLoginAndIsDeletedFalse(String login);

    Optional<User> findByEmailAndIsDeletedFalse(String email);
}
