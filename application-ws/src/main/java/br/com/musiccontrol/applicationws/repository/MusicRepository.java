package br.com.musiccontrol.applicationws.repository;

import br.com.musiccontrol.applicationws.domain.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicRepository extends JpaRepository<Music, Long> {
    List<Music> findByIdUserIdUser(Long idUser);

    List<Music> findByIdUserIdUserAndInstrumentStartingWith(Long idUser, String value);

    List<Music> findByIdUserIdUserAndMusicNameStartingWith(Long idUser, String value);

    List<Music> findByIdUserIdUserAndMusicArtistStartingWith(Long idUser, String value);

    List<Music> findByIdUserIdUserAndMusicGenreStartingWith(Long idUser, String value);
}
