import React, { useState } from "react";
import { musicUri } from '../../../service/musicApi'
import '../modalComponentGlobal.css';
import Notification from "../../notification/notification";
import * as ReactDOM from 'react-dom/client';
import { useNavigate } from "react-router-dom";

export default function ModalRegisterMusic() {

    const [titleInput, setTitleInput] = useState();
    const [artistInput, setArtistInput] = useState();
    const [genreInput, setGenreInput] = useState();
    const [instrumentInput, setInstrumentInput] = useState();

    const navigate = useNavigate();

    function closeNotification() {
        const notification = document.querySelectorAll('.show_notification');

        for (let index = 0; index < notification.length; index++) {
            notification.item(index).classList.remove('show_notification');
        }

    }

    async function createMusic(event) {
        event.preventDefault();

        const obj = {
            idUser: sessionStorage.getItem('idUser'),
            musicName: titleInput,
            musicArtist: artistInput,
            musicGenre: genreInput,
            instrument: instrumentInput
        }

        console.log(obj);

        musicUri.post('', obj).then((response) => {

            document.getElementById('modal-register-music').classList.remove('show');

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
                    content={"Música cadastrada com sucesso!"}
                />

                root.render(elements);

                const interval = setInterval(() => {
                    closeNotification();
                    navigate('/your-musics');
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
            <div id="modal-register-music" className="modal_container">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="title">Cadastrar Musica</h1>

                        {/* <div className="form"> */}
                        <form onSubmit={createMusic}>
                            <div className="single_input">
                                <input onChange={(event) => setTitleInput(event.target.value)} required className="input" type="text" id="titulo" /> <label htmlFor="titulo">Título</label>
                            </div>
                            <div className="single_input">
                                <input onChange={(event) => setArtistInput(event.target.value)} required className="input" type="text" id="artista" /> <label htmlFor="artista">Artista</label>
                            </div>
                            <div className="single_input">
                                <input onChange={(event) => setGenreInput(event.target.value)} required className="input" type="text" id="genero" /> <label htmlFor="genero">Gênero</label>
                            </div>
                            <div className="single_input">
                                <input onChange={(event) => setInstrumentInput(event.target.value)} required className="input" type="text" id="instrumento" /> <label htmlFor="instrumento">Instrumento</label>
                            </div>

                            <button type="submit" className="button">Cadastrar música</button>
                        </form>
                        {/* </div> */}
                    </div>
                </div>
            </div>
            <div id="box-notification" className="box_notification">

            </div>
        </>

    );

}