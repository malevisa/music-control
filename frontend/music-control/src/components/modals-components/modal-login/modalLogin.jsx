import React from "react";
import '../modalComponentGlobal.css'

export default function ModalLogin() {

    return (

        <>
            <div id="modal-login" className="modal_container">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="subtitle">Login</h1>

                        <form>

                            <div className="single_input">
                                <input required className="input" type="text" id="login" /> <label htmlFor="login">Login</label>
                            </div>
                            <div className="single_input">
                                <input required className="input" type="password" id="senha" /> <label htmlFor="senha">Senha</label>
                            </div>
                            <button className="button">Entrar</button>
                        </form>

                        <span className="forgot_password">Esqueceu a senha?</span>
                        <div className="footer_modal">
                            Não possui conta ainda?  <span>Crie uma!</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}