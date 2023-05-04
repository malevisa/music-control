import React, { useState } from "react";
import { userUri } from "../../../service/userApi"
import '../modalComponentGlobal.css'
import { useNavigate } from "react-router-dom";
import * as ReactDOM from 'react-dom/client';
import Notification from "../../notification/notification";

export default function ModalRegister() {

    const [usernameInput, setUsernameInput] = useState();
    const [loginInput, setLoginInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();

    const navigate = useNavigate();

    function closeNotification() {
        const notification = document.querySelectorAll('.show_notification');

        for (let index = 0; index < notification.length; index++) {
            notification.item(index).classList.remove('show_notification');
        }

    }

    async function createUserFunction(evento) {
        evento.preventDefault();

        const objFormatado = {
            username: usernameInput,
            login: loginInput,
            email: emailInput,
            password: passwordInput
        };

        userUri.post('', objFormatado).then((response) => {
            console.log(response);

            sessionStorage.setItem('idUser', response.data.idUser);
            sessionStorage.setItem('username', response.data.username);
            sessionStorage.setItem('login', response.data.login);
            sessionStorage.setItem('email', response.data.email);
            sessionStorage.setItem('deleted', response.data.deleted);
            sessionStorage.setItem('loggedUser', true);

            navigate("/your-musics");

            emailInput.value("");
            loginInput.value("");
            usernameInput.value("");
            passwordInput.value("");

        }).catch((error) => {

            const opa = document.getElementById('box-notification');

            // setErrors(error.response.data)

            const root = ReactDOM.createRoot(
                opa
            );

            const errors = error.response.data;

            const elements = []

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
            <div id="modal-register" className="modal_container">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="subtitle">Cadastro</h1>

                        <form onSubmit={createUserFunction}>
                            <div className="single_input">
                                <input required className="input" type="text" id="nome" onChange={(evento) => setUsernameInput(evento.target.value)} /> <label htmlFor="nome">Nome Completo</label>
                            </div>
                            <div className="single_input">
                                <input required className="input" type="text" id="login" onChange={(evento) => setLoginInput(evento.target.value)} /> <label htmlFor="login">Login</label>
                            </div>
                            <div className="single_input">
                                <input required className="input" type="text" id="email" onChange={(evento) => setEmailInput(evento.target.value)} /> <label htmlFor="email">E-mail</label>
                            </div>
                            <div className="single_input">
                                <input required className="input" type="password" id="senha" onChange={(evento) => setPasswordInput(evento.target.value)} /> <label htmlFor="senha">Senha</label>
                            </div>
                            <button type="submit" className="button">Cadastrar</button>
                        </form>
                        <div className="footer_modal">
                            Já possui conta?<span>Entre!</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="box-notification" className="box_notification">

            </div>
        </>

    );
}