import React, { useState } from "react";
import '../modalComponentGlobal.css'
import { userUri } from "../../../service/userApi";
import { closeNotification, generateNotification } from "../../notification/notificationFunction";

export default function ModalActivateAccount() {

    const [loginInput, setLoginInput] = useState();
    const [emailInput, setEmailInput] = useState();

    async function recoverUser(event) {
        event.preventDefault();

        const objFormatado = {
            login: loginInput,
            email: emailInput
        };

        userUri.put('', objFormatado).then((response) => {

            document.getElementById('modal-activate-account').classList.remove('show');

            if (!response.data.deleted) {

                const data = {
                    title: "Sucesso",
                    content: "Usuário recuperado com sucesso!"
                }

                generateNotification(true, data)

                const interval = setInterval(() => {
                    closeNotification();
                    clearInterval(interval);
                }, 1000 * 3);

                document.getElementById("login").value = '';
                document.getElementById("email").value = '';
            }

        }).catch((error) => {

            const errors = error.response.data;

            generateNotification(false, errors);

            const interval = setInterval(() => {
                closeNotification();
                clearInterval(interval);
            }, 1000 * 7);

        })
    }

    return (

        <>
            <div id="modal-activate-account" className="modal_container">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="title">Recuperar Conta</h1>

                        <span>Favor inserir o login e o e-mail da conta deletada.</span>

                        <form onSubmit={recoverUser}>
                            <div className="single_input">
                                <input onChange={(event) => setLoginInput(event.target.value)} required className="input" type="text" id="login" /> <label htmlFor="login">Login</label>
                            </div>
                            <div className="single_input">
                                <input onChange={(event) => setEmailInput(event.target.value)} required className="input" type="text" id="email" /> <label htmlFor="email">E-mail</label>
                            </div>

                            <button type="submit" className="button">Recuperar conta</button>
                        </form>
                    </div>
                </div>
            </div>
            <div id="box-notification" className="box_notification">

            </div>
        </>

    );

}