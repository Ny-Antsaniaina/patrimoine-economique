import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const PatrimoinePage = () => {
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [jour, setJour] = useState('');
    const [chartData, setChartData] = useState({});

    const fetchChartData = () => {
        axios.post('http://localhost:3000/api/patrimoine/valeur', { dateDebut, dateFin, jour })
            .then(response => {
                const { labels, data } = response.data;
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Valeur du Patrimoine',
                            data,
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(75,192,192,1)',
                        },
                    ],
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des données du graphique', error));
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4 text-center">Patrimoine</h1>
            <Form className="mt-4">
                <Form.Group controlId="formDateDebut">
                    <Form.Label>Date de Début</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formDateFin" className="mt-3">
                    <Form.Label>Date de Fin</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formJour" className="mt-3">
                    <Form.Label>Jour</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Entrez le jour"
                        value={jour}
                        onChange={(e) => setJour(e.target.value)}
                    />
                </Form.Group>

                <Button className="mt-4" variant="primary" onClick={fetchChartData}>
                    Valider
                </Button>
            </Form>

            {chartData.labels && (
                <div className="mt-5">
                    <Line data={chartData} />
                </div>
            )}
        </div>
    );
};

export default PatrimoinePage;
