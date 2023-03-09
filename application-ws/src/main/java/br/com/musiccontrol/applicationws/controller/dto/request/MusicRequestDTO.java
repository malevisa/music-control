package br.com.musiccontrol.applicationws.controller.dto.request;

public class MusicRequestDTO {

    private Long idUser;
    private String musicName;
    private String musicArtist;
    private String musicGenre;
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

    public String getMusicArtist() {
        return musicArtist;
    }

    public String getMusicGenre() {
        return musicGenre;
    }

    public String getInstrument() {
        return instrument;
    }

}
