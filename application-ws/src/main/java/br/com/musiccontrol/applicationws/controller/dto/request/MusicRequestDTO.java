package br.com.musiccontrol.applicationws.controller.dto.request;

import javax.validation.constraints.NotBlank;

public class MusicRequestDTO {

    private Long idUser;

    @NotBlank(message = "Nome da música obrigatório.")
    private String musicName;

    @NotBlank(message = "Artista obrigatório.")
    private String musicArtist;

    @NotBlank(message = "Gênero musical obrigatório.")
    private String musicGenre;

    @NotBlank(message = "Instrumento obrigatório")
    private String instrument;

    public MusicRequestDTO(Long idUser, String musicName, String musicArtist, String musicGenre, String instrument) {
        this.idUser = idUser;
        this.musicName = musicName;
        this.musicArtist = musicArtist;
        this.musicGenre = musicGenre;
        this.instrument = instrument;
    }

    public MusicRequestDTO(String musicName, String musicArtist, String musicGenre, String instrument) {
        this.musicName = musicName;
        this.musicArtist = musicArtist;
        this.musicGenre = musicGenre;
        this.instrument = instrument;
    }

    public MusicRequestDTO() {
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
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
