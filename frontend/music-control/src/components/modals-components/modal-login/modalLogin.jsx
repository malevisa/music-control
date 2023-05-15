import React, { useState } from "react";
import '../modalComponentGlobal.css'
import Notification from "../../notification/notification";
import { useNavigate } from "react-router-dom";
import { userUri } from "../../../service/userApi";
import * as ReactDOM from 'react-dom/client';
import { closeNotification } from "../../notification/notificationFunction";

export default function ModalLogin() {

    const [loginInput, setLoginInput] = useState();
    const [passwordInput, setPasswordInput] = useState();

    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();

        const objFormatado = {
            login: loginInput,
            password: passwordInput
        };

        userUri.post('/user', objFormatado).then((response) => {
            console.log(response);

            sessionStorage.setItem('idUser', response.data.idUser);
            sessionStorage.setItem('username', response.data.username);
            sessionStorage.setItem('login', response.data.login);
            sessionStorage.setItem('email', response.data.email);
            sessionStorage.setItem('deleted', response.data.deleted);
            sessionStorage.setItem('loggedUser', true);

            navigate("/your-musics");

            loginInput.value("");
            passwordInput.value("");

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
            <div id="modal-login" className="modal_container">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="subtitle">Login</h1>

                        <form onSubmit={login}>

                            <div className="single_input">
                                <input onChange={(event) => setLoginInput(event.target.value)} required className="input" type="text" id="login" /> <label htmlFor="login">Login</label>
                            </div>
                            <div className="single_input">
                                <input onChange={(event) => setPasswordInput(event.target.value)} required className="input" type="password" id="senha" /> <label htmlFor="senha">Senha</label>
                            </div>
                            <button type="submit" className="button">Entrar</button>
                        </form>

                        <span className="forgot_password">Esqueceu a senha?</span>
                        <div className="footer_modal">
                            Não possui conta ainda?  <span>Crie uma!</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="box-notification" className="box_notification">

            </div>
        </>

    );

}