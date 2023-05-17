import React, { useEffect, useState } from "react";
import '../modalComponentGlobal.css'
import { useNavigate } from "react-router-dom";
import { musicUri } from "../../../service/musicApi";
import Notification from "../../notification/notification";
import * as ReactDOM from 'react-dom/client';
import { closeNotification } from "../../notification/notificationFunction";

export default function ModalEditMusic(props) {

    const [musicNameInput, setMusicNameInput] = useState(props.musicName);
    const [musicArtistInput, setMusicArtistInput] = useState(props.musicArtist);
    const [musicGenreInput, setMusicGenreInput] = useState(props.musicGenre);
    const [instrumentInput, setInstrumentInput] = useState(props.instrument);

    useEffect(() => {
        closeModal()
    })

    function closeModal() {
        const notification = document.querySelectorAll('.show');

        if (notification.length === 1) {
            notification.item(0).addEventListener('click', (e) => {
                if (e.target.id === "modal-edit-music" || e.target.className === 'close') {
                    notification.item(0).classList.remove('show')
                }
            })
        }

    }

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
                const boxNotification = document.getElementById('box-notification');

                const root = ReactDOM.createRoot(
                    boxNotification
                );

                const elements = []

                elements[0] = <Notification
                    key={0}
                    status={true}
                    title={"Sucesso"}
                    content={"Música editada com sucesso!"}
                />

                root.render(elements);

                const interval = setInterval(() => {
                    closeNotification();
                    window.location.reload();
                    clearInterval(interval);
                }, 1000 * 7);

            }

        }).catch((error) => {

            const boxNotification = document.getElementById('box-notification');

            const root = ReactDOM.createRoot(
                boxNotification
            );

            const errors = error.response.data;

            const elements = []

            errors.length > 0 ? Array.from(errors, (error, index) => {

                elements[index] = <Notification
                    key={index}
                    status={false}
                    title={error.campo == null ? "Erro" : error.campo}
                    content={error.message}
                />

            }) : elements[0] = <Notification
                key={0}
                status={false}
                title={errors.campo == null ? "Erro" : errors.campo}
                content={errors.message}
            />

            root.render(elements);

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
                                    id="titulo" />
                                <label htmlFor="titulo">Título</label>
                            </div>
                            <div className="single_input">
                                <input
                                    defaultValue={musicArtistInput}
                                    onChange={(event) => setMusicArtistInput(event.target.value)}
                                    required
                                    className="input"
                                    type="text"
                                    id="artista" />
                                <label htmlFor="artista">Artista</label>
                            </div>
                            <div className="single_input">
                                <input
                                    defaultValue={musicGenreInput}
                                    onChange={(event) => setMusicGenreInput(event.target.value)}
                                    required
                                    className="input"
                                    type="text"
                                    id="genero" />
                                <label htmlFor="genero">Gênero</label>
                            </div>
                            <div className="single_input">
                                <input
                                    defaultValue={instrumentInput}
                                    onChange={(event) => setInstrumentInput(event.target.value)}
                                    required
                                    className="input"
                                    type="text"
                                    id="instrumento" />
                                <label htmlFor="instrumento">Instrumento</label>
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