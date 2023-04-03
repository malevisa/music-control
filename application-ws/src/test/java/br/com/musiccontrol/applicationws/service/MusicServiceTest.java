package br.com.musiccontrol.applicationws.service;

import br.com.musiccontrol.applicationws.configurations.exceptions.NotFoundException;
import br.com.musiccontrol.applicationws.controller.dto.request.MusicRequestDTO;
import br.com.musiccontrol.applicationws.controller.dto.request.UserRequestDTO;
import br.com.musiccontrol.applicationws.domain.Music;
import br.com.musiccontrol.applicationws.domain.User;
import br.com.musiccontrol.applicationws.repository.MusicRepository;
import br.com.musiccontrol.applicationws.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class MusicServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MusicService musicService;

    @Autowired
    private MusicRepository musicRepository;

    @Test
    @DisplayName("createMusic(), funciona corretamente.")
    void createMusic() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Primeiro usuário de teste",
                        "primeiroTeste",
                        "primeirousuario@teste.com",
                        "Teste123"
                )
        );

        MusicRequestDTO firstMusicRequest = new MusicRequestDTO(
                firstUser.getIdUser(),
                "When I was your man",
                "Bruno Mars",
                "Pop",
                "Violão"
        );

        assertNotNull(
                musicService.createMusic(
                        firstMusicRequest
                )
        );

    }

    @Test
    @DisplayName("createMusic(), o id do usuário não existe no banco de dados, gera NotFoundException.")
    void createMusicUserNotFound() {

        MusicRequestDTO firstMusicRequest = new MusicRequestDTO(
                100000L,
                "When I was your man",
                "Bruno Mars",
                "Pop",
                "Violão"
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.createMusic(
                        firstMusicRequest
                )
        );

    }

    @Test
    @DisplayName("editMusic(), funciona corretamente.")
    void editMusic() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Segundo usuário de teste",
                        "segundoTeste",
                        "segundousuario@teste.com",
                        "Teste123"
                )
        );

        MusicRequestDTO firstMusicRequest = new MusicRequestDTO(
                firstUser.getIdUser(),
                "When I was your man",
                "Bruno Mars",
                "Pop",
                "Violão"
        );

        Music firstMusic = musicService.createMusic(firstMusicRequest);

        firstMusicRequest.setMusicName("The Lazy Song");

        assertNotNull(
                musicService.editMusic(
                        firstMusicRequest,
                        firstMusic.getIdMusic()
                )
        );

    }

    @Test
    @DisplayName("editMusic(), o id da música não existe no banco de dados, gera NotFoundException.")
    void editMusicNotFound() {

        userService.createUser(
                new UserRequestDTO(
                        "Terceiro usuário de teste",
                        "terceiroTeste",
                        "teceirousuario@teste.com",
                        "Teste123"
                )
        );

        MusicRequestDTO firstMusicRequest = new MusicRequestDTO(
                "Eu te devoro",
                "Djavan",
                "MPB",
                "Violão"
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.editMusic(
                        firstMusicRequest,
                        100000L
                )
        );

    }

    @Test
    @DisplayName("deleteMusic(), funciona corretamente.")
    void deleteMusic() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Quarto usuário de teste",
                        "quartoTeste",
                        "quartousuario@teste.com",
                        "Teste123"
                )
        );

        MusicRequestDTO firstMusicRequest = new MusicRequestDTO(
                firstUser.getIdUser(),
                "Monalisa",
                "Jorge Vercillo",
                "MPB",
                "Violão"
        );

        Music firstMusic = musicService.createMusic(firstMusicRequest);

        assertNotNull(
                musicService.deleteMusic(
                        firstMusic.getIdMusic()
                )
        );

    }

    @Test
    @DisplayName("deleteMusic(), o id da música não existe no banco de dados, gera NotFoundException.")
    void deleteMusicNotFound() {

        assertThrows(
                NotFoundException.class,
                () -> musicService.deleteMusic(
                        1000000L
                )
        );

    }

    @Test
    @DisplayName("getMusicsByUser(), funciona corretamente.")
    void getMusicsByUser() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Quinto usuário de teste",
                        "quintoTeste",
                        "quintousuario@teste.com",
                        "Teste123"
                )
        );

        List<MusicRequestDTO> musicRequestList = new ArrayList<>(
                Arrays.asList(
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Ela une todas as coisas",
                                "Jorge Vercillo",
                                "MPB",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "De Janeiro a Janeiro",
                                "Nando Reis",
                                "MPB",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Louca de saudade",
                                "Jorge e Mateus",
                                "Sertanejo",
                                "Violão"
                        )
                )
        );

        musicRequestList.forEach(
                music -> {
                    musicService.createMusic(music);
                }
        );

        assertNotNull(
                musicService.getMusicsByUser(
                        firstUser.getIdUser()
                )
        );

    }

    @Test
    @DisplayName("getMusicsByUser(), retorna a lista de músicas do usuário vazia.")
    void getMusicsByUserEmptyList() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Sexto usuário de teste",
                        "sextoTeste",
                        "sextousuario@teste.com",
                        "Teste123"
                )
        );

        assertTrue(
                musicService.getMusicsByUser(
                        firstUser.getIdUser()
                ).isEmpty()
        );

    }

    @Test
    @DisplayName("getMusicsByUser(), o id do usuário não existe na base de dados, gera NotFoundException.")
    void getMusicsByUserIdUserNotFound() {

        assertThrows(
                NotFoundException.class,
                () -> musicService.getMusicsByUser(
                        1000L
                )
        );

    }

    @Test
    @DisplayName("getMusicById(), funciona corretamente.")
    void getMusicById() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Sétimo usuário de teste",
                        "setimoTeste",
                        "setimousuario@teste.com",
                        "Teste123"
                )
        );

        MusicRequestDTO firstMusicRequest = new MusicRequestDTO(
                firstUser.getIdUser(),
                "When I was your man",
                "Bruno Mars",
                "Pop",
                "Violão"
        );

        Music firstMusic = musicService.createMusic(firstMusicRequest);

        assertNotNull(
                musicService.getMusicById(
                        firstMusic.getIdMusic()
                )
        );

    }

    @Test
    @DisplayName("getMusicById(), o id da música não existe no banco de dados, gera NotFoundException.")
    void getMusicByIdMusicNotFound() {

        assertThrows(
                NotFoundException.class,
                () -> musicService.getMusicById(
                        1000000L
                )
        );

    }

    @Test
    @DisplayName("filterMusics(), funciona corretamente.")
    void filterMusics() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Oitavo usuário de teste",
                        "oitavoTeste",
                        "oitavousuario@teste.com",
                        "Teste123"
                )
        );

        List<MusicRequestDTO> musicRequestList = new ArrayList<>(
                Arrays.asList(
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Ela une todas as coisas",
                                "Jorge Vercillo",
                                "MPB",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "De Janeiro a Janeiro",
                                "Nando Reis",
                                "MPB",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Louca de saudade",
                                "Jorge e Mateus",
                                "Sertanejo",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Nothing Else Matters",
                                "Metallica",
                                "Rock",
                                "Guitarra"
                        )
                )
        );

        musicRequestList.forEach(
                music -> {
                    musicService.createMusic(music);
                }
        );

        assertNotNull(
                musicService.filterMusics(
                        firstUser.getIdUser(),
                        "musicGenre",
                        "MPB"
                )
        );

        assertNotNull(
                musicService.filterMusics(
                        firstUser.getIdUser(),
                        "musicArtist",
                        "Jorge"
                )
        );

        assertNotNull(
                musicService.filterMusics(
                        firstUser.getIdUser(),
                        "instrument",
                        "Guitarra"
                )
        );

        assertNotNull(
                musicService.filterMusics(
                        firstUser.getIdUser(),
                        "musicName",
                        "L"
                )
        );

    }

    @Test
    @DisplayName("filterMusics(), o id do usuário não existe no banco de dados, gera NotFoundException.")
    void filterMusicsNotFoundUser() {

        assertThrows(
                NotFoundException.class,
                () -> musicService.filterMusics(
                        1000000L,
                        "musicGenre",
                        "MPB"
                )
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.filterMusics(
                        1000000L,
                        "musicArtist",
                        "Jorge"
                )
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.filterMusics(
                        1000000L,
                        "instrument",
                        "Guitarra"
                )
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.filterMusics(
                        1000000L,
                        "musicName",
                        "L"
                )
        );

    }

    @Test
    @DisplayName("filterMusics, o campo passado é inválido, gera NotFoundException.")
    void filterMusicsFieldNotFound() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Nono usuário de teste",
                        "nonoTeste",
                        "nonousuario@teste.com",
                        "Teste123"
                )
        );

        List<MusicRequestDTO> musicRequestList = new ArrayList<>(
                Arrays.asList(
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Ela une todas as coisas",
                                "Jorge Vercillo",
                                "MPB",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "De Janeiro a Janeiro",
                                "Nando Reis",
                                "MPB",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Louca de saudade",
                                "Jorge e Mateus",
                                "Sertanejo",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Nothing Else Matters",
                                "Metallica",
                                "Rock",
                                "Guitarra"
                        )
                )
        );

        musicRequestList.forEach(
                music -> {
                    musicService.createMusic(music);
                }
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.filterMusics(
                        firstUser.getIdUser(),
                        "MusicGenre",
                        "MPB"
                )
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.filterMusics(
                        firstUser.getIdUser(),
                        "MusicArtist",
                        "Jorge"
                )
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.filterMusics(
                        firstUser.getIdUser(),
                        "Instrument",
                        "Guitarra"
                )
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.filterMusics(
                        1000000L,
                        "campoInvalido",
                        "L"
                )
        );

    }

    @Test
    @DisplayName("filterMusics(), a lista retornada é vazia.")
    void filterMusicsEmptyList() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Décimo usuário de teste",
                        "decimoTeste",
                        "decimousuario@teste.com",
                        "Teste123"
                )
        );

        assertTrue(
                musicService.filterMusics(
                        firstUser.getIdUser(),
                        "musicGenre",
                        "MPB"
                ).isEmpty()
        );

        assertTrue(
                musicService.filterMusics(
                        firstUser.getIdUser(),
                        "musicArtist",
                        "Jorge"
                ).isEmpty()
        );

        assertTrue(
                musicService.filterMusics(
                        firstUser.getIdUser(),
                        "instrument",
                        "Guitarra"
                ).isEmpty()
        );

        assertTrue(
                musicService.filterMusics(
                        firstUser.getIdUser(),
                        "musicName",
                        "L"
                ).isEmpty()
        );

    }

    @Test
    @DisplayName("getUserStatistics(), funciona corretamente.")
    void getUserStatistics() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Décimo primeiro usuário de teste",
                        "decimoPrimeiroTeste",
                        "decimoPrimeirousuario@teste.com",
                        "Teste123"
                )
        );

        List<MusicRequestDTO> musicRequestList = new ArrayList<>(
                Arrays.asList(
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Ela une todas as coisas",
                                "Jorge Vercillo",
                                "MPB",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "De Janeiro a Janeiro",
                                "Nando Reis",
                                "MPB",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Louca de saudade",
                                "Jorge e Mateus",
                                "Sertanejo",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Nothing Else Matters",
                                "Metallica",
                                "Rock",
                                "Guitarra"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Questão de tempo",
                                "Mell Beatriz",
                                "Sertanejo",
                                "Violão"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "Somewhere over the rainbow",
                                "Israel Kamakawiwo'ole",
                                "Ballad",
                                "Ukulele"
                        ),
                        new MusicRequestDTO(
                                firstUser.getIdUser(),
                                "I Can't Help Falling in Love With You",
                                "Elvis Presley",
                                "Ballad",
                                "Guitarra"
                        )
                )
        );

        musicRequestList.forEach(
                music -> {
                    musicService.createMusic(music);
                }
        );

        assertNotNull(
                musicService.getUserStatisticsMainGenre(firstUser.getIdUser())
        );

        assertNotNull(
                musicService.getUserStatisticsMainArtist(firstUser.getIdUser())
        );

        assertNotNull(
                musicService.getUserStatisticsMainInstrument(firstUser.getIdUser())
        );

    }

    @Test
    @DisplayName("getUserStatistics(), o id do usuário não existe na base de dados, gera NotFoundException.")
    void getUserStatisticsUserNotFound() {

        assertThrows(
                NotFoundException.class,
                () -> musicService.getUserStatisticsMainGenre(10000L)
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.getUserStatisticsMainArtist(10000L)
        );

        assertThrows(
                NotFoundException.class,
                () -> musicService.getUserStatisticsMainInstrument(10000L)
        );

    }

    @Test
    @DisplayName("getUserStatistics, a lista retornada é vazia.")
    void getUserStatisticsEmptyList() {

        User firstUser = userService.createUser(
                new UserRequestDTO(
                        "Décimo segundo usuário de teste",
                        "decimoSegundoTeste",
                        "decimoSegundousuario@teste.com",
                        "Teste123"
                )
        );

        assertNotNull(
                musicService.getUserStatisticsMainGenre(firstUser.getIdUser())
        );

        assertNotNull(
                musicService.getUserStatisticsMainArtist(firstUser.getIdUser())
        );

        assertNotNull(
                musicService.getUserStatisticsMainInstrument(firstUser.getIdUser())
        );

    }

}
