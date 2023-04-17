import React, { useEffect } from "react";
import { Chart, elements } from "chart.js/auto";
import '../dashboard-statistics/dashboardStatistics.css'
import NavbarDashboard from "../../../components/navbar-dashboard/navbarDashboard";

function DashboardStatistics() {

    const fetchDataChartBar = async () => {
        const data = [
            { instrument: 'Teclado', value: 5 },
            { instrument: 'Violão', value: 90 },
            { instrument: 'Ukulele', value: 30 },
            { instrument: 'Baixo', value: 15 },
            { instrument: 'Bateria', value: 1 }
        ];

        new Chart(
            document.getElementById('chart_bar'),
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row.instrument),
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

    const fetchDataChartDoughnut = async () => {
        const data = [300, 50, 100, 100, 100];

        new Chart(
            document.getElementById('chart_doughnut'),
            {
                type: 'doughnut',
                data: {
                    labels: ['teste1', 'teste2', 'teste3', 'teste4', 'teste5'],
                    datasets: [
                        {
                            label: 'Principais Gêneros Musicais',
                            data: data.map(row => row),
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

    const fetchDataChartPolar = async () => {
        const data = [11, 16, 7, 3, 14];

        new Chart(
            document.getElementById('chart_polarArea'),
            {
                type: 'polarArea',
                data: {
                    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: data.map(row => row),
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

    useEffect(() => {
        fetchDataChartBar().catch(console.error);
        fetchDataChartDoughnut().catch(console.error);
        fetchDataChartPolar().catch(console.error);
    }, []);

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