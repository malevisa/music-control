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
        const activateAccount = document.querySelector('.activate-account');
        if (cadastrarMusica && cadastro && activateAccount) {
            cadastrarMusica.addEventListener('click', () => iniciaModal('modal-cadastro-musica'));
            cadastro.addEventListener('click', () => iniciaModal('modal-deletar-musica'));
            activateAccount.addEventListener('click', () => iniciaModal('modal-editar-musica'));
        }
    }, [])

    function iniciaModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('mostrar');
            modal.addEventListener('click', (e) => {
                if (e.target.id === modalId || e.target.className === 'close') {
                    modal.classList.remove('mostrar')
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
                    <button className="btn_new" onClick={() => iniciaModal("modal-cadastro-musica")}>Nova música</button>
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
                                    <button onClick={() => iniciaModal("modal-editar-musica")}>Editar</button>
                                    <button onClick={() => iniciaModal("modal-deletar-musica")}>Deletar</button>
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