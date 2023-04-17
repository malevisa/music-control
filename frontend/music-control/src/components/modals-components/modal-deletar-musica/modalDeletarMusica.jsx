import React from "react";
import '../modalComponentGlobal.css'

export default function ModalDeletarMusica() {

    return (

        <>
            <div id="modal-delete-music" className="modal_container">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="title">Deletar Musica</h1>

                        <div className="deleted_text">
                            <span>Você tem certeza que deseja deletar a música abaixo?</span>
                            <nav>
                                <ul>
                                    <li>Título</li>
                                    <li>Artista</li>
                                    <li>Genero</li>
                                    <li>Instrumento</li>
                                </ul>
                            </nav>

                            <button className="button">Deletar música</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}