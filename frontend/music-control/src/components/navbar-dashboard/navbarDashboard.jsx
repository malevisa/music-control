import React, { useEffect } from "react";
import './navbarDashboard.css'
import { FaMusic, FaUser, FaChartBar } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function NavbarDashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        let btn = document.querySelector("#btn");
        let sidebar = document.querySelector(".sidebar");

        if (sidebar) {
            btn.addEventListener('click', () => activeSidebar(sidebar));
        }
    }, [])

    function activeSidebar(sidebar) {
        sidebar.classList.toggle("active");
    }

    return (
        <>

            {/* <div className="sidebar_content"> */}
                <div className="sidebar">
                    <div className="logo_content">
                        <div id="btn" className="logo">
                            <div className="logo_name">Music-Control</div>
                        </div>
                        <div className="btn_content">
                            <AiOutlineMenu id="btn" onClick={() => activeSidebar(document.querySelector(".sidebar"))} />
                        </div>
                    </div>
                    <ul className="nav_list">
                        <li>
                            <a href="" onClick={() => navigate('/your-musics')}>
                                <div className="icons">
                                    <FaMusic />
                                </div>
                                <span className="links_name">Músicas</span>
                            </a>
                            <span className="tooltip">Músicas</span>
                        </li>
                        <li>
                            <a href="" onClick={() => navigate('/your-statistics')}>
                                <div className="icons">
                                    <FaChartBar />
                                </div>
                                <span className="links_name">Estatísticas</span>
                            </a>
                            <span className="tooltip">Estatísticas</span>
                        </li>
                        <li>
                            <a href="" onClick={() => navigate('/your-perfil')}>
                                <div className="icons">
                                    <FaUser />
                                </div>
                                <span className="links_name">Perfil</span>
                            </a>
                            <span className="tooltip">Perfil</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="" onClick={() => navigate('/')}>
                                <div className="icons">
                                    <ImExit id="log_out" />
                                </div>
                                <span className="links_name">Sair</span>
                            </a>
                            <span className="tooltip">Sair</span>
                        </li>
                    </ul>
                </div>
            {/* </div> */}

        </>
    );

}