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
import { initModal } from "../../components/modals-components/modalComponentGlobal";

function Index() {

    useEffect(() => {
        const login = document.querySelector('.login');
        const register = document.querySelector('.register');
        const activateAccount = document.querySelector('.activate_account');
        if (login && register && activateAccount) {
            login.addEventListener('click', () => initModal('modal-login'));
            register.addEventListener('click', () => initModal('modal-register'));
            activateAccount.addEventListener('click', () => initModal('modal-activate-account'));
        }
    }, [])

    function alterTopic(topic) {

        const objective = document.getElementById('objective');
        const functionality = document.getElementById('functionality');
        const update = document.getElementById('update');

        const buttonObjective = document.getElementById('objectiveButton');
        const buttonFunctionality = document.getElementById('functionalityButton');
        const buttonUpdate = document.getElementById('updateButton');

        switch (topic) {
            case 'objective':

                buttonObjective.classList.add('activate');
                objective.classList.add('show');
                objective.classList.remove('hide');

                if (buttonFunctionality.classList.contains('activate') || buttonUpdate.classList.contains('activate')) {
                    buttonFunctionality.classList.remove('activate');
                    buttonUpdate.classList.remove('activate');
                }

                if (functionality.classList.contains('show') || update.classList.contains('show')) {
                    functionality.classList.remove('show');
                    update.classList.remove('show');

                    functionality.classList.add('hide');
                    update.classList.add('hide');
                }

                break;
            case 'functionality':

                buttonFunctionality.classList.add('activate');
                functionality.classList.add('show');
                functionality.classList.remove('hide');

                if (buttonObjective.classList.contains('activate') || buttonUpdate.classList.contains('activate')) {
                    buttonObjective.classList.remove('activate');
                    buttonUpdate.classList.remove('activate');
                }

                if (objective.classList.contains('show') || update.classList.contains('show')) {
                    objective.classList.remove('show');
                    update.classList.remove('show');

                    objective.classList.add('hide');
                    update.classList.add('hide');
                }

                break;
            case 'update':

                buttonUpdate.classList.add('activate');
                update.classList.add('show');
                update.classList.remove('hide');

                if (buttonObjective.classList.contains('activate') || buttonFunctionality.classList.contains('activate')) {
                    buttonObjective.classList.remove('activate');
                    buttonFunctionality.classList.remove('activate');
                }

                if (objective.classList.contains('show') || functionality.classList.contains('show')) {
                    objective.classList.remove('show');
                    functionality.classList.remove('show');

                    objective.classList.add('hide');
                    functionality.classList.add('hide');
                }
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
                                <button onClick={() => initModal('modal-register')}>Cadastrar</button>
                                <button onClick={() => initModal('modal-login')}>Entrar</button>
                            </div>
                        </div>
                    </div>
                    <div className="project_container">
                        <div className="container">
                            <h1>Conheça o projeto</h1>
                            <div className="topics_container">
                                <button className="activate" id="objectiveButton" onClick={() => alterTopic("objective")}>Objetivos</button>
                                <button id="functionalityButton" onClick={() => alterTopic("functionality")}>Funcionalidades</button>
                                <button id="updateButton" onClick={() => alterTopic("update")}>Futuras Atualizações</button>
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
                                        <li>Verificar estatísticas do repertório.</li>
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