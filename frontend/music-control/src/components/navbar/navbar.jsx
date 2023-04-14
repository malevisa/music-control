import React from "react";
import './navbar.css';
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    return (
        <>
            <div className="navbar">
                <div className="titlebar" onClick={() => navigate('/')}>Music-Control</div>
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