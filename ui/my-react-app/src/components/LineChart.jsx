import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
    const labels = data.map(item => item.date);
    const values = data.map(item => item.valeur);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Valeur des Possessions',
                data: values,
                fill: false,
                backgroundColor: 'rgba(75, 192, 198, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Valeur: ${context.raw}`;
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;
