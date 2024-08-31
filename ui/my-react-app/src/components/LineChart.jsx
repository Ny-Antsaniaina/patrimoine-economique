import React from 'react';
import { Line } from 'react-chartjs-2';

function ChartComponent({ data }) {
    if (!data || !data.datasets) {
        return <div>Loading...</div>;
    }

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            }
        }
    };

    return <Line data={data} options={options} />;
}

export default ChartComponent;
