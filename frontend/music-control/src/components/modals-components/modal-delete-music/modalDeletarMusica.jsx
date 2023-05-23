import React, { useEffect } from "react";
import '../modalComponentGlobal.css'
import { musicUri } from "../../../service/musicApi";
import { closeNotification, generateNotification } from "../../notification/notificationFunction";
import { closeModal } from "../modalComponentGlobal";

export default function ModalDeleteMusic(props) {

    useEffect(() => {
        closeModal()
    })

    function deleteMusic() {

        musicUri.delete(`/${props.idMusic}`).then((response) => {

            document.getElementById('modal-delete-music').classList.remove('show');

            if (response) {
                const data = {
                    title: "Sucesso",
                    content: "Música deletada com sucesso!"
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

            generateNotification(false, errors);

            const interval = setInterval(() => {
                closeNotification();
                clearInterval(interval);
            }, 1000 * 7);

        })

    }

    return (

        <>
            <div id="modal-delete-music" className="modal_container show">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="title">Deletar Musica</h1>

                        <div className="deleted_text">
                            <span>Você tem certeza que deseja deletar a música abaixo?</span>
                            <nav>
                                <ul>
                                    <li>Título: {props.musicName}</li>
                                    <li>Artista: {props.musicArtist}</li>
                                    <li>Genero: {props.musicGenre}</li>
                                    <li>Instrumento: {props.instrument}</li>
                                </ul>
                            </nav>

                            <button onClick={() => deleteMusic()} className="button">Deletar música</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="box-notification" className="box_notification">

            </div>
        </>

    );

}