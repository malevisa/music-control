import React from "react";
import '../modalComponentGlobal.css'
import { useNavigate } from "react-router-dom";
import { userUri } from "../../../service/userApi";
import Notification from "../../notification/notification";
import * as ReactDOM from 'react-dom/client';

export default function ModalDeleteAccount(props) {

    const navigate = useNavigate();

    function closeNotification() {
        const notification = document.querySelectorAll('.show_notification');

        for (let index = 0; index < notification.length; index++) {
            notification.item(index).classList.remove('show_notification');
        }

    }

    function deleteAccount() {
        userUri.delete(`/${props.idUser}`).then((response) => {

            const boxNotification = document.getElementById('box-notification');
            const elements = [];
            const root = ReactDOM.createRoot(
                boxNotification
            );

            elements[0] = <Notification
                key={0}
                status={true}
                title={"Sucesso"}
                content={response.data}
            />

            root.render(elements);

            const interval = setInterval(() => {
                sessionStorage.clear();
                navigate("/");
                clearInterval(interval);
            }, 1000 * 3);

        }).catch((error) => {

            console.log(error)

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
            <div id="modal-delete-account" className="modal_container">
                <div>
                    <div className="modal">
                        <button className="close">x</button>
                        <h1 className="title">Deletar Conta</h1>

                        <div className="deleted_text">
                            <span>Você tem certeza que deseja deletar sua conta?</span>

                            <button onClick={() => deleteAccount()} className="button">Deletar conta</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="box-notification" className="box_notification">

            </div>
        </>

    );

}