package br.com.musiccontrol.applicationws.service;

import br.com.musiccontrol.applicationws.controller.dto.request.MusicRequestDTO;
import br.com.musiccontrol.applicationws.domain.Music;

import java.util.List;

public interface MusicService {

    Music createMusic(MusicRequestDTO music);

    Music editMusic(MusicRequestDTO newMusic, Long idMusic);

    String deleteMusic(Long idMusic);

    List<Music> getMusicsByUser(Long idUser);

    Music getMusicById(Long idMusic);

    List<Music> filterMusics(Long idUser, String field, String value);
}
