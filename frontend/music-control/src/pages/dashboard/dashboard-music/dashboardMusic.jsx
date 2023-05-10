import React, { useEffect, useState } from "react";
import "../dashboard-music/dashboardMusic.css"
import NavbarDashboard from "../../../components/navbar-dashboard/navbarDashboard";
import ModalCadastroMusica from "../../../components/modals-components/modal-register-music/modalCadastroMusica";
import ModalDeletarMusica from "../../../components/modals-components/modal-delete-music/modalDeletarMusica";
import ModalEditarMusica from "../../../components/modals-components/modal-edit-music/modalEditarMusica";
import { musicUri } from "../../../service/musicApi";
import { useLocation } from "react-router-dom";

function DashboardMusic() {

    const [musics, setMusics] = useState([]);

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

    function getMusicsByUser() {
        musicUri.get(`/music/${sessionStorage.getItem('idUser')}`).then((response) => {
            setMusics(response.data.listMusics === undefined ? [] : response.data.listMusics);
        }).catch((error) => {

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
                            <input required className="input" type="text" id="search" /> <label htmlFor="search">Pesquisar</label>
                        </div>
                        <div className="combo_field">
                            <select required id="field">
                                <option selected defaultValue={"invalidField"} disabled>Campo...</option>
                                <option value="musicName">Nome</option>
                                <option value="musicArtist">Artista</option>
                                <option value="musicGenre">Gênero Musical</option>
                                <option value="instrument">Instrumento</option>
                            </select>
                        </div>
                        <button className="btn_filter">Filtrar</button>
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
                                            <button onClick={() => initModal('modal-edit-music')}>Editar</button>
                                            <button onClick={() => initModal('modal-delete-music')}>Deletar</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>

            <ModalCadastroMusica />
            <ModalEditarMusica />
            <ModalDeletarMusica />

        </>
    );

}

export default DashboardMusic;