import React from "react";
import '../modalComponentGlobal.css'

export default function ModalActivateAccount() {

    return (

        <>
            <div id="modal-activate-account" className="modal_container">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="title">Recuperar Conta</h1>

                        {/* <div className="form"> */}
                            <span>Favor inserir o login e o e-mail da conta deletada.</span>

                            <form>
                                <div className="single_input">
                                    <input required className="input" type="text" id="login" /> <label htmlFor="login">Login</label>
                                </div>
                                <div className="single_input">
                                    <input required className="input" type="text" id="email" /> <label htmlFor="email">E-mail</label>
                                </div>
                                
                                <button className="button">Recuperar conta</button>
                            </form>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>

    );

}