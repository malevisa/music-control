import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import ModalActivateAccount from "./components/modals-components/modal-activate-account/modalActivateAccount";
import ModalEditarMusica from "./components/modals-components/modal-editar-musica/modalEditarMusica";
import ModalCadastroMusica from "./components/modals-components/modal-cadastro-musica/modalCadastroMusica";
import ModalDeletarMusica from "./components/modals-components/modal-deletar-musica/modalDeletarMusica";
import ModalLogin from "./components/modals-components/modal-login/modalLogin";
import ModalCadastro from "../src/components/modals-components/modal-cadastro/modalCadastro";
import NavbarDashboard from "./components/navbar-dashboard/navbarDashboard";
import DashboardMusic from "./pages/dashboard/dashboard-music/dashboardMusic";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

function RoutesComponent() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Index />} />
                <Route path="/components" element={<ModalDeletarMusica />} />
                <Route path="/your-musics" element={<DashboardMusic />} />

                {/* pagina de erro */}
                {/* <Route path="/*" element={<NotFound404 />} /> */}

            </Routes>

        </BrowserRouter>

    )

}

export default RoutesComponent;