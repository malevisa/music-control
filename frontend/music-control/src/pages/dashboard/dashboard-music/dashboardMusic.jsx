import React, { useEffect, useState } from "react";
import "../dashboard-music/dashboardMusic.css"
import NavbarDashboard from "../../../components/navbar-dashboard/navbarDashboard";
import ModalCadastroMusica from "../../../components/modals-components/modal-register-music/modalCadastroMusica";
import ModalDeletarMusica from "../../../components/modals-components/modal-delete-music/modalDeletarMusica";
import ModalEditarMusica from "../../../components/modals-components/modal-edit-music/modalEditarMusica";
import { musicUri } from "../../../service/musicApi";
import { useLocation } from "react-router-dom";
import * as ReactDOM from 'react-dom/client';
import Notification from "../../../components/notification/notification";
import { closeNotification } from "../../../components/notification/notificationFunction";

function DashboardMusic() {

    const [musics, setMusics] = useState([]);
    const [fieldComboBox, setFieldComboBox] = useState();
    const [filterValue, setFilterValue] = useState();

    const location = useLocation();

    useEffect(() => {
        const cadastrarMusica = document.querySelector('.cadastro-musica');
        const cadastro = document.querySelector('.editar-musica');
        const activateAccount = document.querySelector('.activate_account');
        if (cadastrarMusica && cadastro && activateAccount) {
            cadastrarMusica.addEventListener('click', () => initModal('modal-register-music'));
            cadastro.addEventListener('click', () => initModal('modal-delete-music'));
            activateAccount.addEventListener('click', () => initModal('modal-edit-music'));
        }
    }, [])

    useEffect(() => {
        getMusicsByUser()
    }, [location.key])

    function initModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            modal.addEventListener('click', (e) => {
                if (e.target.id === modalId || e.target.className === 'close') {
                    modal.classList.remove('show')
                }
            });
        }
    }

    function initMusicsModal(isEdit, music) {
        const root = ReactDOM.createRoot(
            document.getElementById("modal-box")
        );

        const element = isEdit ?
            <ModalEditarMusica
                key={music.idMusic}
                idMusic={music.idMusic}
                musicName={music.musicName}
                musicArtist={music.musicArtist}
                musicGenre={music.musicGenre}
                instrument={music.instrument} />
            : <ModalDeletarMusica
                key={music.idMusic}
                idMusic={music.idMusic}
                musicName={music.musicName}
                musicArtist={music.musicArtist}
                musicGenre={music.musicGenre}
                instrument={music.instrument} />;

        root.render(element);

    }

    function getMusicsByUser() {
        musicUri.get(`/music/${sessionStorage.getItem('idUser')}`).then((response) => {
            setMusics(response.data.listMusics === undefined ? [] : response.data.listMusics);
        }).catch((error) => {

            console.log(error);

        })
    }

    function filterMusics(event) {
        event.preventDefault();
        musicUri.get(`/${sessionStorage.getItem('idUser')}/${fieldComboBox}/${filterValue}`).then((response) => {
            setMusics(response.data.listMusics === undefined ? [] : response.data.listMusics);
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

            <NavbarDashboard />
            <div className="home_content">
                <div>
                    <div className="title">Suas músicas</div>
                    <button className="btn_new" onClick={() => initModal("modal-register-music")}>Nova música</button>
                </div>

                <div className="search_box">
                    <form>
                        <div className="box-input">
                            <input onChange={(event) => setFilterValue(event.target.value)} required className="input" type="text" id="search" /> <label htmlFor="search">Pesquisar</label>
                        </div>
                        <div className="combo_field">
                            <select onChange={(event) => setFieldComboBox(event.target.value)} required id="field">
                                <option selected value={"invalidField"} disabled>Campo...</option>
                                <option value="musicName">Nome</option>
                                <option value="musicArtist">Artista</option>
                                <option value="musicGenre">Gênero Musical</option>
                                <option value="instrument">Instrumento</option>
                            </select>
                        </div>
                        <button onClick={(event) => filterMusics(event)} className="btn_filter">Filtrar</button>
                    </form>
                </div>
                <div className="box_table">
                    <table>
                        <thead className="table_head">
                            <tr>
                                <th>Id Música</th>
                                <th>Música</th>
                                <th>Artista</th>
                                <th>Gênero Musical</th>
                                <th>Instrumento</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="table_body">
                            {Array.from(musics, (music, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{music.musicName}</td>
                                        <td>{music.musicArtist}</td>
                                        <td>{music.musicGenre}</td>
                                        <td>{music.instrument}</td>
                                        <td className="box_buttons">
                                            <button onClick={() => initMusicsModal(true, music)}>Editar</button>
                                            <button onClick={() => initMusicsModal(false, music)}>Deletar</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
            <div id="modal-box"></div>

            <ModalCadastroMusica />

        </>
    );

}

export default DashboardMusic;