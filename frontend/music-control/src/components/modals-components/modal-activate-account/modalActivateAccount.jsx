import React, { useState } from "react";
import '../modalComponentGlobal.css'
import Notification from "../../notification/notification";
import * as ReactDOM from 'react-dom/client';
import { useNavigate } from "react-router-dom";
import { userUri } from "../../../service/userApi";

export default function ModalActivateAccount() {

    const [loginInput, setLoginInput] = useState();
    const [emailInput, setEmailInput] = useState();

    const navigate = useNavigate();

    function closeNotification() {
        const notification = document.querySelectorAll('.show_notification');

        for (let index = 0; index < notification.length; index++) {
            notification.item(index).classList.remove('show_notification');
        }

    }

    async function recoverUser(event) {
        event.preventDefault();

        const objFormatado = {
            login: loginInput,
            email: emailInput
        };

        userUri.put('', objFormatado).then((response) => {
            console.log(response);

            document.getElementById('modal-activate-account').classList.remove('show');

            if (!response.data.deleted) {
                const boxNotification = document.getElementById('box-notification');
                const elements = [];
                const root = ReactDOM.createRoot(
                    boxNotification
                );

                elements[0] = <Notification
                    key={0}
                    status={true}
                    title={"Sucesso"}
                    content={"Usuário recuperado com sucesso!"}
                />

                root.render(elements);

                const interval = setInterval(() => {
                    closeNotification();
                    clearInterval(interval);
                }, 1000 * 7);

                loginInput.value("");
                emailInput.value("");
            }

        }).catch((error) => {

            const boxNotification = document.getElementById('box-notification');
            const errors = error.response.data;
            const elements = [];
            const root = ReactDOM.createRoot(
                boxNotification
            );

            errors.length > 0 ? Array.from(errors, (error, index) => {

                elements[index] = <Notification
                    key={index}
                    status={false}
                    title={error.campo == null ? "Erro" : error.campo}
                    content={error.message}
                />

            }) : elements[0] = <Notification
                key={0}
                status={false}
                title={errors.campo == null ? "Erro" : errors.campo}
                content={errors.message}
            />

            root.render(elements);

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