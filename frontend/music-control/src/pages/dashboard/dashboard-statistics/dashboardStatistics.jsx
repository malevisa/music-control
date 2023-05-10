import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";
import '../dashboard-statistics/dashboardStatistics.css'
import NavbarDashboard from "../../../components/navbar-dashboard/navbarDashboard";
import { musicUri } from "../../../service/musicApi"

function DashboardStatistics() {

    useEffect(() => {
        getUserStatistics();
    });

    function getUserStatistics() {
        musicUri.get(`/user/${sessionStorage.getItem('idUser')}`).then((response) => {

            console.log(response);

            if (response.data.mainInstruments === undefined ||
                response.data.mainGenres === undefined ||
                response.data.mainArtists === undefined
            ) {
                fetchDataChartBar(response.data.mainInstruments);
                fetchDataChartDoughnut(response.data.mainGenres);
                fetchDataChartPolar(response.data.mainArtists);
            }

        }).catch((error) => {

        })
    }

    const fetchDataChartBar = async (mainInstruments) => {

        const data = mainInstruments;

        new Chart(
            document.getElementById('chart_bar'),
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row.field),
                    datasets: [
                        {
                            backgroundColor: [
                                'rgba(255, 124, 10, 1)',
                                'rgba(255, 124, 10, 0.8)',
                                'rgba(255, 124, 10, 0.6)',
                                'rgba(255, 124, 10, 0.4)',
                                'rgba(255, 124, 10, 0.2)'
                            ],
                            label: 'Principais instrumentos',
                            data: data.map(row => row.value),
                            borderColor: 'rgba(255, 124, 10, 1)',
                            borderWidth: 2
                        }
                    ]
                }
            }
        );
    }

    const fetchDataChartDoughnut = async (mainGenres) => {
        const data = mainGenres;

        new Chart(
            document.getElementById('chart_doughnut'),
            {
                type: 'doughnut',
                data: {
                    labels: data.map(row => row.field),
                    datasets: [
                        {
                            label: 'Principais Gêneros Musicais',
                            data: data.map(row => row.value),
                            backgroundColor: [
                                '#FF7C0A',
                                '#FFEE30',
                                '#FF5100',
                                '#FFD500',
                                '#FFBD06'
                            ],
                            hoverOffset: 10
                        }
                    ]
                }
            }
        );
    }

    const fetchDataChartPolar = async (mainArtists) => {
        const data = mainArtists;

        new Chart(
            document.getElementById('chart_polarArea'),
            {
                type: 'polarArea',
                data: {
                    labels: data.map(row => row.field),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: data.map(row => row.value),
                            backgroundColor: [
                                '#FF7C0A',
                                '#FFEE30',
                                '#FF5100',
                                '#FFD500',
                                '#FFBD06'
                            ],
                            hoverOffset: 10
                        }
                    ]
                }
            }
        );
    }

    return (

        <>
            <NavbarDashboard />
            <div className="charts_content">
                <div className="second_chart_box">
                    <div className="chart_test">
                        <h4>Principais Instrumentos</h4>
                        <canvas id="chart_bar"></canvas>
                    </div>
                </div>
                <div className="first_chart_box">
                    <div className="chart_test">
                        <h4>Principais Gêneros Musicais</h4>
                        <canvas id="chart_doughnut"></canvas>
                    </div>
                    <div className="chart_test">
                        <h4>Principais Artistas</h4>
                        <canvas id="chart_polarArea"></canvas>
                    </div>
                </div>
            </div>
        </>

    );

}

export default DashboardStatistics;