import React from "react";
import './navbar.css';

export default function Navbar() {

    return (
        <>
            <div className="navbar">
                <div className="titlebar">Music-Control</div>
                <div className="menu">
                    <nav>
                        <ul>
                            <li className="cadastro">Cadastro</li>
                            <li className="login">Login</li>
                            <li className="activate-account">Ativar Conta</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );


}