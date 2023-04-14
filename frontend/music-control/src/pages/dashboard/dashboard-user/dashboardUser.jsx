import React from "react";
import '../dashboard-user/dashboardUser.css'
import NavbarDashboard from "../../../components/navbar-dashboard/navbarDashboard";

function DashboardUser() {

    return (

        <>
            <NavbarDashboard />
            <div className="user_content">
                <div className="head_content">
                    <div className="title">
                        <h2>Perfil</h2>
                        <span>Atualize as informações do seu perfil ou desative a conta.</span>
                    </div>
                    <button className="deactivate_account">
                        Desativar conta
                    </button>
                </div>
                <div className="form_content">
                    <div className="input_user">
                        <span>Nome Completo</span>
                        <input type="text" value={"Matheus Lemos Vieira dos Santos"}/>
                    </div>
                    <div className="input_user">
                        <span>Login</span>
                        <input type="text" value={"Matheus Lemos Vieira dos Santos"}/>
                    </div>
                    <div className="input_user">
                        <span>E-mail</span>
                        <input type="text" value={"Matheus Lemos Vieira dos Santos"}/>
                    </div>
                    <div>
                        <span>Senha</span>
                        <input type="password" value={"Matheus Lemos Vieira dos Santos"}/>
                    </div>
                    <div className="btn_content">
                        <button className="cancel">Cancelar</button>
                        <button className="save">Salvar</button>
                    </div>
                </div>
            </div>
        </>

    );

}

export default DashboardUser;