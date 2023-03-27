package br.com.musiccontrol.applicationws.controller.dto.response;

import br.com.musiccontrol.applicationws.domain.StatisticsBasic;

import java.util.List;

public class UserStatisticsDTO {

    private List<StatisticsBasic> mainGenres;
    private List<StatisticsBasic> mainArtists;
    private List<StatisticsBasic> mainInstruments;

    public UserStatisticsDTO(List<StatisticsBasic> mainGenres, List<StatisticsBasic> mainArtists, List<StatisticsBasic> mainInstruments) {
        this.mainGenres = mainGenres;
        this.mainArtists = mainArtists;
        this.mainInstruments = mainInstruments;
    }

    public List<StatisticsBasic> getMainGenres() {
        return mainGenres;
    }

    public void setMainGenres(List<StatisticsBasic> mainGenres) {
        this.mainGenres = mainGenres;
    }

    public List<StatisticsBasic> getMainArtists() {
        return mainArtists;
    }

    public void setMainArtists(List<StatisticsBasic> mainArtists) {
        this.mainArtists = mainArtists;
    }

    public List<StatisticsBasic> getMainInstruments() {
        return mainInstruments;
    }

    public void setMainInstruments(List<StatisticsBasic> mainInstruments) {
        this.mainInstruments = mainInstruments;
    }
}
