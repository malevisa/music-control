import React, { useState } from "react";
import { userUri } from "../../../service/userApi"
import '../modalComponentGlobal.css'

export default function ModalRegister() {

    const [usernameInput, setUsernameInput] = useState();
    const [loginInput, setLoginInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();

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

            alert("Sucesso!");
        }).catch((error) => {
            console.log(error);
            let status = error.response.status;
            let message = error.response.data.errors;

            console.log(status);
            console.log(message);
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
        </>

    );
}