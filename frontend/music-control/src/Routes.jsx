import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import NavbarDashboard from "./components/navbar-dashboard/navbarDashboard";
import DashboardMusic from "./pages/dashboard/dashboard-music/dashboardMusic";
import DashboardStatistics from "./pages/dashboard/dashboard-statistics/dashboardStatistics";
import DashboardUser from "./pages/dashboard/dashboard-user/dashboardUser";
import NotFound404 from "./pages/not-found/notFound";

function RoutesComponent() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Index />} />
                <Route path="/components" element={<NavbarDashboard />} />
                <Route path="/your-musics" element={<DashboardMusic />} />
                <Route path="/your-statistics" element={<DashboardStatistics />} />
                <Route path="/your-perfil" element={<DashboardUser />} />

                {/* pagina de erro */}
                <Route path="/*" element={<NotFound404 />} />

            </Routes>

        </BrowserRouter>

    )

}

export default RoutesComponent;