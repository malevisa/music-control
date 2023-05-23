import React from "react";
import '../modalComponentGlobal.css'
import { useNavigate } from "react-router-dom";
import { userUri } from "../../../service/userApi";
import { closeNotification, generateNotification } from "../../notification/notificationFunction";

export default function ModalDeleteAccount(props) {

    const navigate = useNavigate();

    function deleteAccount() {
        userUri.delete(`/${props.idUser}`).then((response) => {

            const data = {
                title: "Sucesso",
                content: response.data
            }

            generateNotification(true, data);

            const interval = setInterval(() => {
                sessionStorage.clear();
                navigate("/");
                clearInterval(interval);
            }, 1000 * 1);

        }).catch((error) => {

            const errors = error.response.data;

            generateNotification(false, errors)

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