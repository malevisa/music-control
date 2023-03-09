package br.com.musiccontrol.applicationws.controller.dto.response;

public class MusicResponseDTO {

    private UserResponseDTO user;
    private Long idMusic;
    private String musicName;
    private String musicArtist;
    private String musicGenre;
    private String instrument;

    public MusicResponseDTO(UserResponseDTO user, Long idMusic, String musicName, String musicArtist, String musicGenre, String instrument) {
        this.user = user;
        this.idMusic = idMusic;
        this.musicName = musicName;
        this.musicArtist = musicArtist;
        this.musicGenre = musicGenre;
        this.instrument = instrument;
    }

    public MusicResponseDTO(Long idMusic, String musicName, String musicArtist, String musicGenre, String instrument) {
        this.idMusic = idMusic;
        this.musicName = musicName;
        this.musicArtist = musicArtist;
        this.musicGenre = musicGenre;
        this.instrument = instrument;
    }

    public UserResponseDTO getUser() {
        return user;
    }

    public void setUser(UserResponseDTO user) {
        this.user = user;
    }

    public String getMusicName() {
        return musicName;
    }

    public void setMusicName(String musicName) {
        this.musicName = musicName;
    }

    public String getMusicArtist() {
        return musicArtist;
    }

    public void setMusicArtist(String musicArtist) {
        this.musicArtist = musicArtist;
    }

    public String getMusicGenre() {
        return musicGenre;
    }

    public void setMusicGenre(String musicGenre) {
        this.musicGenre = musicGenre;
    }

    public String getInstrument() {
        return instrument;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

}
