import React, { useEffect } from "react";
import "../dashboard-music/dashboardMusic.css"
import NavbarDashboard from "../../../components/navbar-dashboard/navbarDashboard";
import ModalCadastroMusica from "../../../components/modals-components/modal-cadastro-musica/modalCadastroMusica";
import ModalDeletarMusica from "../../../components/modals-components/modal-deletar-musica/modalDeletarMusica";
import ModalEditarMusica from "../../../components/modals-components/modal-editar-musica/modalEditarMusica";

function DashboardMusic() {

    useEffect(() => {
        const cadastrarMusica = document.querySelector('.cadastro-musica');
        const cadastro = document.querySelector('.editar-musica');
        const activateAccount = document.querySelector('.activate_account');
        if (cadastrarMusica && cadastro && activateAccount) {
            cadastrarMusica.addEventListener('click', () => iniciaModal('modal-register-music'));
            cadastro.addEventListener('click', () => iniciaModal('modal-delete-music'));
            activateAccount.addEventListener('click', () => iniciaModal('modal-edit-music'));
        }
    }, [])

    function iniciaModal(modalId) {
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

    return (
        <>

            <NavbarDashboard />
            <div className="home_content">
                <div>
                    <div className="title">Suas músicas</div>
                    <button className="btn_new" onClick={() => iniciaModal("modal-register-music")}>Nova música</button>
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
                        {/* <div className="scroll_body"> */}
                        <tbody className="table_body">
                            <tr>
                                <td>1</td>
                                <td>Welcome to my life</td>
                                <td>Simple Plan</td>
                                <td>Rock</td>
                                <td>Guitarra</td>
                                <td className="box_buttons">
                                    <button onClick={() => iniciaModal("modal-edit-music")}>Editar</button>
                                    <button onClick={() => iniciaModal("modal-delete-music")}>Deletar</button>
                                </td>
                            </tr>
                        </tbody>
                        {/* </div> */}
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