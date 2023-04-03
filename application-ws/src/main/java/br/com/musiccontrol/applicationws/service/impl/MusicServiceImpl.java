package br.com.musiccontrol.applicationws.service.impl;

import br.com.musiccontrol.applicationws.configurations.exceptions.NotFoundException;
import br.com.musiccontrol.applicationws.controller.dto.request.MusicRequestDTO;
import br.com.musiccontrol.applicationws.domain.Music;
import br.com.musiccontrol.applicationws.domain.StatisticsBasic;
import br.com.musiccontrol.applicationws.domain.User;
import br.com.musiccontrol.applicationws.repository.MusicRepository;
import br.com.musiccontrol.applicationws.repository.UserRepository;
import br.com.musiccontrol.applicationws.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MusicServiceImpl implements MusicService {

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Music createMusic(MusicRequestDTO music) {
        Optional<User> userOptional = userRepository.findByIdUserAndIsDeletedFalse(music.getIdUser());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            return musicRepository.save(
                    new Music(
                            new User(
                                    user.getIdUser(),
                                    user.getUsername(),
                                    user.getLogin(),
                                    user.getEmail(),
                                    user.getPassword(),
                                    user.getDeleted()
                            ),
                            music.getMusicName(),
                            music.getMusicArtist(),
                            music.getMusicGenre(),
                            music.getInstrument()
                    )
            );

        }

        throw new NotFoundException("Usuário não encontrado.");
    }

    @Override
    public Music editMusic(MusicRequestDTO newMusic, Long idMusic) {

        Optional<Music> musicOptional = musicRepository.findById(idMusic);

        if (musicOptional.isPresent()) {

            Music music = musicOptional.get();

            music.setMusicName(newMusic.getMusicName());
            music.setMusicArtist(newMusic.getMusicArtist());
            music.setMusicGenre(newMusic.getMusicGenre());
            music.setInstrument(newMusic.getInstrument());

            return musicRepository.save(music);

        }

        throw new NotFoundException("Música não encontrada.");
    }

    @Override
    public String deleteMusic(Long idMusic) {

        if (musicRepository.existsById(idMusic)) {

            musicRepository.deleteById(idMusic);

            return "Música excluida com sucesso.";
        }

        throw new NotFoundException("Não é possível editar a música. Música não encontrada");
    }

    @Override
    public List<Music> getMusicsByUser(Long idUser) {

        if (userRepository.existsByIdUserAndIsDeletedFalse(idUser)) {
            return musicRepository.findByIdUserIdUser(idUser);
        }

        throw new NotFoundException("Usuário não encontrado.");

    }

    @Override
    public Music getMusicById(Long idMusic) {

        Optional<Music> musicOptional = musicRepository.findById(idMusic);

        if (musicOptional.isPresent()) {
            return musicOptional.get();
        }

        throw new NotFoundException("Música não encontrada.");
    }

    @Override
    public List<Music> filterMusics(Long idUser, String field, String value) {

        if (userRepository.existsByIdUserAndIsDeletedFalse(idUser)) {
            return switch (field) {
                case "instrument" -> musicRepository.findByIdUserIdUserAndInstrumentStartingWithIgnoreCase(idUser, value);
                case "musicName" -> musicRepository.findByIdUserIdUserAndMusicNameStartingWithIgnoreCase(idUser, value);
                case "musicArtist" -> musicRepository.findByIdUserIdUserAndMusicArtistStartingWithIgnoreCase(idUser, value);
                case "musicGenre" -> musicRepository.findByIdUserIdUserAndMusicGenreStartingWithIgnoreCase(idUser, value);
                default -> throw new NotFoundException("Campo não encontrado.");
            };
        }

        throw new NotFoundException("Usuário não encontrado.");
    }

    @Override
    public List<StatisticsBasic> getUserStatisticsMainGenre(Long idUser) {

        Optional<User> userOptional = userRepository.findById(idUser);

        if (userOptional.isPresent()) {
            return musicRepository.getCountMusicGenreByIdUser(userOptional.get());
        }

        throw new NotFoundException("Usuário não encontrado");
    }

    @Override
    public List<StatisticsBasic> getUserStatisticsMainArtist(Long idUser) {

        Optional<User> userOptional = userRepository.findById(idUser);

        if (userOptional.isPresent()) {
            return musicRepository.countMusicArtistByIdUser(userOptional.get());
        }

        throw new NotFoundException("Usuário não encontrado");
    }

    @Override
    public List<StatisticsBasic> getUserStatisticsMainInstrument(Long idUser) {

        Optional<User> userOptional = userRepository.findById(idUser);

        if (userOptional.isPresent()) {
            return musicRepository.countMusicInstrumentByIdUser(userOptional.get());
        }

        throw new NotFoundException("Usuário não encontrado");
    }
}
