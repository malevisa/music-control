import React from "react";
import '../modalComponentGlobal.css'

export default function ModalEditarMusica() {

    return (

        <>
            <div id="modal-edit-music" className="modal_container">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="title">Editar Musica</h1>

                        {/* <div className="form"> */}
                            <form>
                                <div className="single_input">
                                    <input required className="input" type="text" id="titulo" /> <label htmlFor="titulo">Título</label>
                                </div>
                                <div className="single_input">
                                    <input required className="input" type="text" id="artista" /> <label htmlFor="artista">Artista</label>
                                </div>
                                <div className="single_input">
                                    <input required className="input" type="text" id="genero" /> <label htmlFor="genero">Gênero</label>
                                </div>
                                <div className="single_input">
                                    <input required className="input" type="text" id="instrumento" /> <label htmlFor="instrumento">Instrumento</label>
                                </div>
                                <button className="button">Editar música</button>
                            </form>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>

    );

}