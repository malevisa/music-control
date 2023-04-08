import React, { useEffect } from "react";
import Footer from "../../components/footer/footer";
import ModalLogin from "../../components/modals-components/modal-login/modalLogin";
import ModalCadastro from "../../components/modals-components/modal-cadastro/modalCadastro";
import ModalActivateAccount from "../../components/modals-components/modal-activate-account/modalActivateAccount";
import ComposeMusicBro from "../../assets/Compose-music-bro.png";
import PlayingMusicBro from "../../assets/Playing-Music-bro.png";
import Me from "../../assets/me.jpeg";
import Navbar from "../../components/navbar/navbar";
import './index.css';
import { useNavigate } from "react-router-dom";

function Index() {

    const navigate = useNavigate();

    useEffect(() => {
        const login = document.querySelector('.login');
        const cadastro = document.querySelector('.cadastro');
        const activateAccount = document.querySelector('.activate-account');
        if (login && cadastro && activateAccount) {
            login.addEventListener('click', () => iniciaModal('modal-login'));
            cadastro.addEventListener('click', () => iniciaModal('modal-cadastro'));
            activateAccount.addEventListener('click', () => iniciaModal('modal-activate-account'));
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

    function trocaTopico(topico) {

        const objetivo = document.getElementById('objetivo');
        const funcionalidade = document.getElementById('funcionalidade');
        const atualizacao = document.getElementById('atualizacao');

        const buttonObjetivo = document.getElementById('objetivoButton');
        const buttonFuncionalidade = document.getElementById('funcionalidadeButton');
        const buttonAtualizacao = document.getElementById('atualizacaoButton');

        switch (topico) {
            case 'objetivo':
                buttonObjetivo.classList.add('activate');
                buttonFuncionalidade.classList.remove('activate');
                buttonAtualizacao.classList.remove('activate');
                funcionalidade.classList.remove('mostrar');
                funcionalidade.classList.add('esconder');
                objetivo.classList.add('mostrar');
                objetivo.classList.remove('esconder');
                atualizacao.classList.remove('mostrar');
                atualizacao.classList.add('esconder');

                break;
            case 'funcionalidade':
                buttonObjetivo.classList.remove('activate');
                buttonFuncionalidade.classList.add('activate');
                buttonAtualizacao.classList.remove('activate');

                funcionalidade.classList.add('mostrar');
                funcionalidade.classList.remove('esconder');
                objetivo.classList.remove('mostrar');
                objetivo.classList.add('esconder');
                atualizacao.classList.remove('mostrar');
                atualizacao.classList.add('esconder');
                break;
            case 'atualizacao':
                buttonObjetivo.classList.remove('activate');
                buttonFuncionalidade.classList.remove('activate');
                buttonAtualizacao.classList.add('activate');
                funcionalidade.classList.remove('mostrar');
                funcionalidade.classList.add('esconder');
                objetivo.classList.remove('mostrar');
                objetivo.classList.add('esconder');
                atualizacao.classList.add('mostrar');
                atualizacao.classList.remove('esconder');
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
                        <div className="chamativo">
                            <h1 className="subtitle">Music-Control</h1>
                            <span>Music-control é um sistema de controle musical, criado para
                                auxiliar os músicos no controle de seu repertório, mostrando
                                a quantidade de músicas aprendidas, os instrumentos, nomes,
                                gêneros e artistas.</span>
                            <div className="button-container">
                                <button onClick={() => iniciaModal('modal-cadastro')}>Cadastrar</button>
                                <button onClick={() => iniciaModal('modal-login')}>Entrar</button>
                            </div>
                        </div>
                    </div>
                    <div className="project-container">
                        <div className="container">
                            <h1>Conheça o projeto</h1>
                            <div className="topicos-container">
                                <button className="activate" id="objetivoButton" onClick={() => trocaTopico("objetivo")}>Objetivos</button>
                                <button id="funcionalidadeButton" onClick={() => trocaTopico("funcionalidade")}>Funcionalidades</button>
                                <button id="atualizacaoButton" onClick={() => trocaTopico("atualizacao")}>Futuras Atualizações</button>
                            </div>
                            <div>
                                <nav className="mostrar" id="objetivo">
                                    <ul>
                                        <li>Auxiliar os músicos.</li>
                                        <li>Organizar o repertório musical e ajudar a manter o controle das músicas aprendidas.</li>
                                        <li>Recriar meu projeto individual da faculdade.</li>
                                    </ul>
                                </nav>
                                <nav id="funcionalidade" className="esconder">
                                    <ul>
                                        <li>Criar, deletar e editar suas músicas.</li>
                                        <li>Ordenar o repertório por: Nome da música, Artista, Gênero e
                                            Instrumento.</li>
                                        <li>Filtrar músicas pelas informções.</li>
                                    </ul>
                                </nav>
                                <nav id="atualizacao" className="esconder">
                                    <ul>
                                        <li>Implementação das playlists.</li>
                                        <li>Socializar a plataforma, permitir fazer amigos, compartilhar
                                            playlists e repertório completo.</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <img src={PlayingMusicBro} alt="Guitarrista" />
                    </div>
                    <div className="me-container">
                        <img src={Me} alt="" />
                        <div className="sobre-mim">
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