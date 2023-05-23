import React, { useState } from "react";
import '../modalComponentGlobal.css'
import { useNavigate } from "react-router-dom";
import { userUri } from "../../../service/userApi";
import { closeNotification, generateNotification } from "../../notification/notificationFunction";

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

            sessionStorage.setItem('idUser', response.data.idUser);
            sessionStorage.setItem('username', response.data.username);
            sessionStorage.setItem('login', response.data.login);
            sessionStorage.setItem('email', response.data.email);
            sessionStorage.setItem('deleted', response.data.deleted);
            sessionStorage.setItem('loggedUser', true);

            navigate("/your-musics");

            document.getElementById("login").value = '';
            document.getElementById("password").value = '';

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
                                <input onChange={(event) => setPasswordInput(event.target.value)} required className="input" type="password" id="password" /> <label htmlFor="password">Senha</label>
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