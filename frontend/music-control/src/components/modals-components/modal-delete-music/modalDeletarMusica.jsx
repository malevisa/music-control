import React, { useEffect } from "react";
import '../modalComponentGlobal.css'
import { musicUri } from "../../../service/musicApi";
import Notification from "../../notification/notification";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from 'react-dom/client';

export default function ModalDeleteMusic(props) {

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

    function closeNotification() {
        const notification = document.querySelectorAll('.show_notification');

        for (let index = 0; index < notification.length; index++) {
            notification.item(index).classList.remove('show_notification');
        }

    }

    function deleteMusic() {

        musicUri.delete(`/${props.idMusic}`).then((response) => {

            document.getElementById('modal-delete-music').classList.remove('show');

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
                    content={"Música deletada com sucesso!"}
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
        </>

    );

}