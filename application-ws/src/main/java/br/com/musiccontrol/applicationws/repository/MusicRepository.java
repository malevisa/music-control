package br.com.musiccontrol.applicationws.repository;

import br.com.musiccontrol.applicationws.domain.Music;
import br.com.musiccontrol.applicationws.domain.StatisticsBasic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MusicRepository extends JpaRepository<Music, Long> {
    List<Music> findByIdUserIdUser(Long idUser);

    List<Music> findByIdUserIdUserAndInstrumentStartingWith(Long idUser, String value);

    List<Music> findByIdUserIdUserAndMusicNameStartingWith(Long idUser, String value);

    List<Music> findByIdUserIdUserAndMusicArtistStartingWith(Long idUser, String value);

    List<Music> findByIdUserIdUserAndMusicGenreStartingWith(Long idUser, String value);

    @Query("SELECT m.musicGenre, count(m.musicGenre) as countValue FROM Music m WHERE m.idUser = ?1 group by m.musicGenre order by countValue")
    List<StatisticsBasic> countMusicGenreByIdUser(Long idUser);

    @Query("SELECT m.musicArtist, count(m.musicArtist) as countValue FROM Music m WHERE m.idUser = ?1 group by m.musicArtist order by countValue")
    List<StatisticsBasic> countMusicArtistByIdUser(Long idUser);

    @Query("SELECT m.instrument, count(m.instrument) as countValue FROM Music m WHERE m.idUser = ?1 group by m.instrument order by countValue")
    List<StatisticsBasic> countMusicInstrumentByIdUser(Long idUser);

}
