import React, { useEffect, useState } from "react";
import '../modalComponentGlobal.css'
import { musicUri } from "../../../service/musicApi";
import { closeNotification, generateNotification } from "../../notification/notificationFunction";
import { closeModal } from "../modalComponentGlobal";

export default function ModalEditMusic(props) {

    const [musicNameInput, setMusicNameInput] = useState(props.musicName);
    const [musicArtistInput, setMusicArtistInput] = useState(props.musicArtist);
    const [musicGenreInput, setMusicGenreInput] = useState(props.musicGenre);
    const [instrumentInput, setInstrumentInput] = useState(props.instrument);

    useEffect(() => {
        closeModal()
    })

    async function editMusic(event) {

        event.preventDefault();

        const obj = {
            idUser: sessionStorage.getItem('idUser'),
            musicName: musicNameInput,
            musicArtist: musicArtistInput,
            musicGenre: musicGenreInput,
            instrument: instrumentInput
        }

        musicUri.put(`/${props.idMusic}`, obj).then((response) => {

            document.getElementById('modal-edit-music').classList.remove('show');

            if (response) {

                const data = {
                    title: "Sucesso",
                    content: "Música editada com sucesso!"
                }

                generateNotification(true, data);

                const interval = setInterval(() => {
                    closeNotification();
                    window.location.reload();
                    clearInterval(interval);
                }, 1000 * 3);

            }

        }).catch((error) => {

            const errors = error.response.data;

            generateNotification(false, errors)

            const interval = setInterval(() => {
                closeNotification();
                clearInterval(interval);
            }, 1000 * 7);

        })

    }

    return (

        <>
            <div id="modal-edit-music" className="modal_container show">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="title">Editar Musica</h1>

                        <form onSubmit={editMusic}>
                            <div className="single_input">
                                <input
                                    defaultValue={musicNameInput}
                                    onChange={(event) => setMusicNameInput(event.target.value)}
                                    required
                                    className="input"
                                    type="text"
                                    id="title" />
                                <label htmlFor="title">Título</label>
                            </div>
                            <div className="single_input">
                                <input
                                    defaultValue={musicArtistInput}
                                    onChange={(event) => setMusicArtistInput(event.target.value)}
                                    required
                                    className="input"
                                    type="text"
                                    id="artist" />
                                <label htmlFor="artist">Artista</label>
                            </div>
                            <div className="single_input">
                                <input
                                    defaultValue={musicGenreInput}
                                    onChange={(event) => setMusicGenreInput(event.target.value)}
                                    required
                                    className="input"
                                    type="text"
                                    id="genre" />
                                <label htmlFor="genre">Gênero</label>
                            </div>
                            <div className="single_input">
                                <input
                                    defaultValue={instrumentInput}
                                    onChange={(event) => setInstrumentInput(event.target.value)}
                                    required
                                    className="input"
                                    type="text"
                                    id="instrument" />
                                <label htmlFor="instrument">Instrumento</label>
                            </div>
                            <button type="submit" className="button">Editar música</button>
                        </form>
                    </div>
                </div>
            </div>
            <div id="box-notification" className="box_notification">

            </div>
        </>

    );

}