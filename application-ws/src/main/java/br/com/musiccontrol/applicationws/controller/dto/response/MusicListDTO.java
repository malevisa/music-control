package br.com.musiccontrol.applicationws.controller.dto.response;

import java.util.List;

public class MusicListDTO {

    private UserResponseDTO user;
    private List<MusicListItemDTO> listMusics;

    public MusicListDTO(UserResponseDTO user, List<MusicListItemDTO> listMusics) {
        this.user = user;
        this.listMusics = listMusics;
    }

    public UserResponseDTO getUser() {
        return user;
    }

    public void setUser(UserResponseDTO user) {
        this.user = user;
    }

    public List<MusicListItemDTO> getListMusics() {
        return listMusics;
    }

    public void setListMusics(List<MusicListItemDTO> listMusics) {
        this.listMusics = listMusics;
    }
}
