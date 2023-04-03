package br.com.musiccontrol.applicationws.repository;

import br.com.musiccontrol.applicationws.domain.Music;
import br.com.musiccontrol.applicationws.domain.StatisticsBasic;
import br.com.musiccontrol.applicationws.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MusicRepository extends JpaRepository<Music, Long> {
    List<Music> findByIdUserIdUser(Long idUser);

    List<Music> findByIdUserIdUserAndInstrumentStartingWithIgnoreCase(Long idUser, String value);

    List<Music> findByIdUserIdUserAndMusicNameStartingWithIgnoreCase(Long idUser, String value);

    List<Music> findByIdUserIdUserAndMusicArtistStartingWithIgnoreCase(Long idUser, String value);

    List<Music> findByIdUserIdUserAndMusicGenreStartingWithIgnoreCase(Long idUser, String value);

    @Query("select " +
            "new br.com.musiccontrol.applicationws.domain.StatisticsBasic(" +
            "lower(m.musicGenre) as musicGenre," +
            "count(m.musicGenre) as countValue" +
            ") " +
            "FROM Music m " +
            "where m.idUser = ?1 " +
            "group by musicGenre " +
            "order by countValue desc"
    )
    List<StatisticsBasic> getCountMusicGenreByIdUser(User user);

    @Query("select " +
            "new br.com.musiccontrol.applicationws.domain.StatisticsBasic(" +
            "lower(m.musicArtist) as musicArtist," +
            "count(m.musicArtist) as countValue" +
            ") " +
            "FROM Music m " +
            "where m.idUser = ?1 " +
            "group by musicArtist " +
            "order by countValue desc"
    )
    List<StatisticsBasic> countMusicArtistByIdUser(User user);

    @Query("select " +
            "new br.com.musiccontrol.applicationws.domain.StatisticsBasic(" +
            "m.instrument," +
            "count(m.instrument) as countValue" +
            ") " +
            "FROM Music m " +
            "where m.idUser = ?1 " +
            "group by m.instrument " +
            "order by countValue desc"
    )
    List<StatisticsBasic> countMusicInstrumentByIdUser(User user);
}
