package br.com.musiccontrol.applicationws.controller;

import br.com.musiccontrol.applicationws.controller.dto.request.MusicRequestDTO;
import br.com.musiccontrol.applicationws.controller.dto.response.*;
import br.com.musiccontrol.applicationws.domain.Music;
import br.com.musiccontrol.applicationws.domain.StatisticsBasic;
import br.com.musiccontrol.applicationws.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/musics")
public class MusicController {

    @Autowired
    private MusicService musicService;

    @PostMapping()
    private ResponseEntity<MusicResponseDTO> createMusic(@RequestBody @Valid MusicRequestDTO music) {

        Music musicCreated = musicService.createMusic(music);

        return ResponseEntity.status(201).body(
                new MusicResponseDTO(
                        new UserResponseDTO(
                                musicCreated.getIdUser().getIdUser(),
                                musicCreated.getIdUser().getUsername(),
                                musicCreated.getIdUser().getLogin(),
                                musicCreated.getIdUser().getEmail(),
                                musicCreated.getIdUser().getDeleted()
                        ),
                        musicCreated.getIdMusic(),
                        musicCreated.getMusicName(),
                        musicCreated.getMusicArtist(),
                        musicCreated.getMusicGenre(),
                        musicCreated.getInstrument()
                )
        );
    }

    @PutMapping("/{idMusic}")
    private ResponseEntity<MusicResponseDTO> editMusic(@RequestBody @Valid MusicRequestDTO newMusic, @PathVariable Long idMusic) {

        Music music = musicService.editMusic(newMusic, idMusic);

        return ResponseEntity.status(200).body(
                new MusicResponseDTO(
                        new UserResponseDTO(
                                music.getIdUser().getIdUser(),
                                music.getIdUser().getUsername(),
                                music.getIdUser().getLogin(),
                                music.getIdUser().getEmail(),
                                music.getIdUser().getDeleted()
                        ),
                        music.getIdMusic(),
                        music.getMusicName(),
                        music.getMusicArtist(),
                        music.getMusicGenre(),
                        music.getInstrument()
                )
        );
    }

    @DeleteMapping("/{idMusic}")
    private ResponseEntity<String> deleteMusic(@PathVariable Long idMusic) {

        String message = musicService.deleteMusic(idMusic);

        return ResponseEntity.status(200).body(
                message
        );
    }

    @GetMapping("/music/{idUser}")
    private ResponseEntity<MusicListDTO> getMusicsByUser(@PathVariable Long idUser) {

        List<Music> musicList = musicService.getMusicsByUser(idUser);
        List<MusicListItemDTO> musicResponseDTOList = new ArrayList<>();

        musicList.forEach(music -> {
            musicResponseDTOList.add(
                    new MusicListItemDTO(
                            music.getIdMusic(),
                            music.getMusicName(),
                            music.getMusicArtist(),
                            music.getMusicGenre(),
                            music.getInstrument()
                    )
            );
        });

        if (musicResponseDTOList.isEmpty()) return ResponseEntity.status(204).build();

        return ResponseEntity.status(200).body(
                new MusicListDTO(
                        new UserResponseDTO(
                                musicList.get(0).getIdUser().getIdUser(),
                                musicList.get(0).getIdUser().getUsername(),
                                musicList.get(0).getIdUser().getLogin(),
                                musicList.get(0).getIdUser().getEmail(),
                                musicList.get(0).getIdUser().getDeleted()
                        ),
                        musicResponseDTOList
                )
        );

    }

    @GetMapping("/{idMusic}")
    private ResponseEntity<MusicResponseDTO> getMusicById(@PathVariable Long idMusic) {

        Music music = musicService.getMusicById(idMusic);

        return ResponseEntity.status(200).body(
                new MusicResponseDTO(
                        new UserResponseDTO(
                                music.getIdUser().getIdUser(),
                                music.getIdUser().getUsername(),
                                music.getIdUser().getLogin(),
                                music.getIdUser().getEmail(),
                                music.getIdUser().getDeleted()
                        ),
                        music.getIdMusic(),
                        music.getMusicName(),
                        music.getMusicArtist(),
                        music.getMusicGenre(),
                        music.getInstrument()
                )
        );
    }

    @GetMapping("/{idUser}/{field}/{value}")
    private ResponseEntity<MusicListDTO> filterMusics(@PathVariable Long idUser, @PathVariable String field, @PathVariable String value) {

        List<Music> musicList = musicService.filterMusics(idUser, field, value);
        List<MusicListItemDTO> musicResponseDTOList = new ArrayList<>();

        musicList.forEach(music -> {
            musicResponseDTOList.add(
                    new MusicListItemDTO(
                            music.getIdMusic(),
                            music.getMusicName(),
                            music.getMusicArtist(),
                            music.getMusicGenre(),
                            music.getInstrument()
                    )
            );
        });

        if (musicResponseDTOList.isEmpty()) return ResponseEntity.status(204).build();

        return ResponseEntity.status(200).body(
                new MusicListDTO(
                        new UserResponseDTO(
                                musicList.get(0).getIdUser().getIdUser(),
                                musicList.get(0).getIdUser().getUsername(),
                                musicList.get(0).getIdUser().getLogin(),
                                musicList.get(0).getIdUser().getEmail(),
                                musicList.get(0).getIdUser().getDeleted()
                        ),
                        musicResponseDTOList
                )
        );
    }

    @GetMapping("/user/{idUser}")
    public ResponseEntity<UserStatisticsDTO> getUserStatistics(@PathVariable Long idUser) {

        List<StatisticsBasic> mainGenre = musicService.getUserStatisticsMainGenre(idUser);
        List<StatisticsBasic> mainArtist = musicService.getUserStatisticsMainArtist(idUser);
        List<StatisticsBasic> mainInstrument = musicService.getUserStatisticsMainInstrument(idUser);

        if (mainGenre.isEmpty() && mainArtist.isEmpty() && mainInstrument.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(
                new UserStatisticsDTO(
                        mainGenre,
                        mainArtist,
                        mainInstrument
                )
        );

    }

}
