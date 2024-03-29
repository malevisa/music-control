import React, { useEffect, useState } from "react";
import '../dashboard-user/dashboardUser.css'
import NavbarDashboard from "../../../components/navbar-dashboard/navbarDashboard";
import { userUri } from "../../../service/userApi";
import ModalDeleteAccount from "../../../components/modals-components/modal-delete-account/modalDeleteAccount";
import { initModal } from "../../../components/modals-components/modalComponentGlobal";
import { closeNotification, generateNotification } from "../../../components/notification/notificationFunction";

function DashboardUser() {

    const [usernameInput, setUsernameInput] = useState(sessionStorage.getItem('username'));
    const [loginInput, setLoginInput] = useState(sessionStorage.getItem('login'));
    const [emailInput, setEmailInput] = useState(sessionStorage.getItem('email'));

    useEffect(() => {
        const deleteAccount = document.querySelector('.delete-account');
        if (deleteAccount) {
            deleteAccount.addEventListener('click', () => initModal('modal-delete-account'));
        }
    }, [])

    async function editUser(event) {
        event.preventDefault();

        const obj = {
            username: usernameInput,
            login: loginInput,
            email: emailInput
        };

        userUri.put(`/${sessionStorage.getItem('idUser')}`, obj).then((response) => {

            const data = {
                title: "Sucesso",
                content: "Informações atualizadas com sucesso!"
            }

            generateNotification(true, data);

            sessionStorage.removeItem('username');
            sessionStorage.removeItem('login');
            sessionStorage.removeItem('email');

            sessionStorage.setItem('username', response.data.username);
            sessionStorage.setItem('login', response.data.login);
            sessionStorage.setItem('email', response.data.email);

            const interval = setInterval(() => {
                closeNotification();
                clearInterval(interval);
            }, 1000 * 7);


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
            <NavbarDashboard />
            <div className="user_content">
                <div className="head_content">
                    <div className="title">
                        <h2>Perfil</h2>
                        <span>Atualize as informações do seu perfil ou desative a conta.</span>
                    </div>
                    <button onClick={() => initModal("modal-delete-account")} className="deactivate_account">
                        Desativar conta
                    </button>
                </div>
                <div className="form_content">
                    <form onSubmit={editUser} action="">
                        <div className="input_user">
                            <span>Nome Completo</span>
                            <input onChange={(event) => setUsernameInput(event.target.value)} type="text" defaultValue={usernameInput} />
                        </div>
                        <div className="input_user">
                            <span>Login</span>
                            <input onChange={(event) => setLoginInput(event.target.value)} type="text" defaultValue={loginInput} />
                        </div>
                        <div className="input_user">
                            <span>E-mail</span>
                            <input onChange={(event) => setEmailInput(event.target.value)} type="text" defaultValue={emailInput} />
                        </div>
                        <div className="btn_content">
                            <button type="submit" className="save">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="box-notification" className="box_notification">

            </div>
            <ModalDeleteAccount
                key={0}
                idUser={sessionStorage.getItem('idUser')} />
        </>

    );

}

export default DashboardUser;