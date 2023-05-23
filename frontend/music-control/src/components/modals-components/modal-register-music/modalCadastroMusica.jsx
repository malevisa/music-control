import React, { useState } from "react";
import { musicUri } from '../../../service/musicApi'
import '../modalComponentGlobal.css';
import { useNavigate } from "react-router-dom";
import { closeNotification, generateNotification } from "../../notification/notificationFunction";

export default function ModalRegisterMusic() {

    const [titleInput, setTitleInput] = useState();
    const [artistInput, setArtistInput] = useState();
    const [genreInput, setGenreInput] = useState();
    const [instrumentInput, setInstrumentInput] = useState();

    const navigate = useNavigate();

    async function createMusic(event) {
        event.preventDefault();

        const obj = {
            idUser: sessionStorage.getItem('idUser'),
            musicName: titleInput,
            musicArtist: artistInput,
            musicGenre: genreInput,
            instrument: instrumentInput
        }

        musicUri.post('', obj).then((response) => {

            document.getElementById('modal-register-music').classList.remove('show');

            if (response) {

                const data = {
                    title: "Sucesso",
                    content: "Música cadastrada com sucesso!"
                }

                generateNotification(true, data);

                document.getElementById("title").value = '';
                document.getElementById("artist").value = '';
                document.getElementById("genre").value = '';
                document.getElementById("instrument").value = '';

                const interval = setInterval(() => {
                    closeNotification();
                    navigate('/your-musics');
                    clearInterval(interval);
                }, 1000 * 3);

                document.getElementById("search").value = '';
                document.getElementById("field").value = 'invalidField';
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
            <div id="modal-register-music" className="modal_container">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="title">Cadastrar Musica</h1>

                        {/* <div className="form"> */}
                        <form onSubmit={createMusic}>
                            <div className="single_input">
                                <input onChange={(event) => setTitleInput(event.target.value)} required className="input" type="text" id="title" /> <label htmlFor="title">Título</label>
                            </div>
                            <div className="single_input">
                                <input onChange={(event) => setArtistInput(event.target.value)} required className="input" type="text" id="artist" /> <label htmlFor="artist">Artista</label>
                            </div>
                            <div className="single_input">
                                <input onChange={(event) => setGenreInput(event.target.value)} required className="input" type="text" id="genre" /> <label htmlFor="genre">Gênero</label>
                            </div>
                            <div className="single_input">
                                <input onChange={(event) => setInstrumentInput(event.target.value)} required className="input" type="text" id="instrument" /> <label htmlFor="instrument">Instrumento</label>
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