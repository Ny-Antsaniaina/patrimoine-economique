// import React, { useState, useEffect } from 'react';
// import ChartComponent from '../components/ChartComponent';
// import ErrorBoundary from '../components/ErrorBoundary';
//
// function MyChartPage() {
//     const [chartData, setChartData] = useState(null);
//
//     useEffect(() => {
//         // Simuler une récupération de données depuis une API
//         const fetchData = async () => {
//             const data = {
//                 labels: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01'],
//                 datasets: [
//                     {
//                         label: 'Patrimoine',
//                         data: [400000, 410000, 420000, 430000, 440000],
//                         fill: false,
//                         borderColor: 'rgb(75, 192, 192)',
//                         tension: 0.1
//                     }
//                 ]
//             };
//             setChartData(data);
//         };
//
//         fetchData();
//     }, []);
//
//     return (
//         <div>
//             <h1>Patrimoine au fil du temps</h1>
//             <ErrorBoundary>
//                 <ChartComponent data={chartData} />
//             </ErrorBoundary>
//         </div>
//     );
// }
//
// export default MyChartPage;
