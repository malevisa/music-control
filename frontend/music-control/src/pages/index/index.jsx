import React, { useEffect } from "react";
import Footer from "../../components/footer/footer";
import ModalLogin from "../../components/modals-components/modal-login/modalLogin";
import ModalCadastro from "../../components/modals-components/modal-register/modalCadastro";
import ModalActivateAccount from "../../components/modals-components/modal-activate-account/modalActivateAccount";
import ComposeMusicBro from "../../assets/Compose-music-bro.png";
import PlayingMusicBro from "../../assets/Playing-Music-bro.png";
import Me from "../../assets/me.jpeg";
import Navbar from "../../components/navbar/navbar";
import './index.css';

function Index() {

    useEffect(() => {
        const login = document.querySelector('.login');
        const register = document.querySelector('.register');
        const activateAccount = document.querySelector('.activate_account');
        if (login && register && activateAccount) {
            login.addEventListener('click', () => iniciaModal('modal-login'));
            register.addEventListener('click', () => iniciaModal('modal-register'));
            activateAccount.addEventListener('click', () => iniciaModal('modal-activate-account'));
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

    function trocaTopico(topico) {

        const objective = document.getElementById('objective');
        const functionality = document.getElementById('functionality');
        const update = document.getElementById('update');

        const buttonObjective = document.getElementById('objectiveButton');
        const buttonFunctionality = document.getElementById('functionalityButton');
        const buttonUpdate = document.getElementById('updateButton');

        switch (topico) {
            case 'objective':
                buttonObjective.classList.add('activate');
                buttonFunctionality.classList.remove('activate');
                buttonUpdate.classList.remove('activate');
                functionality.classList.remove('show');
                functionality.classList.add('hide');
                objective.classList.add('show');
                objective.classList.remove('hide');
                update.classList.remove('show');
                update.classList.add('hide');

                break;
            case 'functionality':
                buttonObjective.classList.remove('activate');
                buttonFunctionality.classList.add('activate');
                buttonUpdate.classList.remove('activate');

                functionality.classList.add('show');
                functionality.classList.remove('hide');
                objective.classList.remove('show');
                objective.classList.add('hide');
                update.classList.remove('show');
                update.classList.add('hide');
                break;
            case 'update':
                buttonObjective.classList.remove('activate');
                buttonFunctionality.classList.remove('activate');
                buttonUpdate.classList.add('activate');
                functionality.classList.remove('show');
                functionality.classList.add('hide');
                objective.classList.remove('show');
                objective.classList.add('hide');
                update.classList.add('show');
                update.classList.remove('hide');
                break;

            default:
                break;
        }

    }

    return (

        <>
            <div>
                <div>
                    <Navbar></Navbar>
                </div>
                <div className="content">
                    <div className="banner">
                        <img src={ComposeMusicBro} alt="Compositor" />
                        <div className="project_description">
                            <h1 className="subtitle">Music-Control</h1>
                            <span>Music-control é um sistema de controle musical, criado para
                                auxiliar os músicos no controle de seu repertório, mostrando
                                a quantidade de músicas aprendidas, os instrumentos, nomes,
                                gêneros e artistas.</span>
                            <div className="button_container">
                                <button onClick={() => iniciaModal('modal-register')}>Cadastrar</button>
                                <button onClick={() => iniciaModal('modal-login')}>Entrar</button>
                            </div>
                        </div>
                    </div>
                    <div className="project_container">
                        <div className="container">
                            <h1>Conheça o projeto</h1>
                            <div className="topics_container">
                                <button className="activate" id="objectiveButton" onClick={() => trocaTopico("objective")}>Objetivos</button>
                                <button id="functionalityButton" onClick={() => trocaTopico("functionality")}>Funcionalidades</button>
                                <button id="updateButton" onClick={() => trocaTopico("update")}>Futuras Atualizações</button>
                            </div>
                            <div>
                                <nav className="show" id="objective">
                                    <ul>
                                        <li>Auxiliar os músicos.</li>
                                        <li>Organizar o repertório musical e ajudar a manter o controle das músicas aprendidas.</li>
                                        <li>Recriar meu projeto individual da faculdade.</li>
                                    </ul>
                                </nav>
                                <nav id="functionality" className="hide">
                                    <ul>
                                        <li>Criar, deletar e editar suas músicas.</li>
                                        <li>Ordenar o repertório por: Nome da música, Artista, Gênero e
                                            Instrumento.</li>
                                        <li>Filtrar músicas pelas informções.</li>
                                    </ul>
                                </nav>
                                <nav id="update" className="hide">
                                    <ul>
                                        <li>Implementação das playlists.</li>
                                        <li>Socializar a plataforma, permitir fazer amigos, compartilhar
                                            playlists e repertório completo.</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <img src={PlayingMusicBro} alt="Guitar player" />
                    </div>
                    <div className="me_container">
                        <img src={Me} alt="" />
                        <div className="about_me">
                            <h1>Sobre mim</h1>
                            <span>
                                Olá sou o Matheus, o desenvolvedor desse sistema, muito prazer!
                                Desde muito novo a música sempre fez parte da minha vida, seja em filmes,
                                videogames, cantando,
                                dançando ou apenas ouvindo, alguns anos atrás realizei um dos meus sonhos
                                de aprender a tocar
                                violão, porém sempre tive um pouco de dificuldade para lembrar de todas as
                                músicas que eu aprendi a tocar. Esse projeto é algo muito importante para
                                mim, pois ele junta a paixão pela música que vem comigo desde muito novo e
                                a minha área profissional,  realizei o desenvolvimento e ideação no 1°
                                semestre da faculdade e agora depois de formado, com conhecimentos mais
                                sólidos e objetivos a serem alcançados profissionalmente, realizei novamente
                                o desenvolvimento deste projeto com o intuito de fortalecer o meu
                                conhecimento nas seguintes tecnologias: Java, Springboot, MySQL e React.
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer></Footer>
                </div>
            </div>
            <ModalLogin />
            <ModalCadastro />
            <ModalActivateAccount />
        </>

    );

}

export default Index