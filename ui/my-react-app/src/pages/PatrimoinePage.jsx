import React, { useState, useEffect } from 'react';
import LineChart from '../components/LineChart';
import { Form, Button } from 'react-bootstrap';

const PatrimoinePage = () => {
    const [data, setData] = useState([]);
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [selectedJour, setSelectedJour] = useState('');

    const calculateValeurActuelle = (possession, date) => {
        const dateDebut = new Date(possession.dateDebut);
        const dateActuelle = new Date(date);

        const differenceDate = {
            year: dateActuelle.getFullYear() - dateDebut.getFullYear(),
            month: dateActuelle.getMonth() - dateDebut.getMonth(),
            day: dateActuelle.getDate() - dateDebut.getDate(),
        };
        let raison = differenceDate.year + differenceDate.month / 12 + differenceDate.day / 365;

        return possession.valeur - possession.valeur * (raison * possession.tauxAmortissement / 100);
    };

    const handleValidate = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/possessions');
            const result = await response.json();
            const possessions = result.data[0].data.possessions;

            const startDate = new Date(dateDebut);
            const endDate = new Date(dateFin);

            const filteredData = possessions.map(possession => {
                const possessionStartDate = new Date(possession.dateDebut);
                const possessionEndDate = possession.dateFin ? new Date(possession.dateFin) : new Date();
                let dates = [];

                let currentDate = startDate > possessionStartDate ? startDate : possessionStartDate;

                while (currentDate <= endDate && currentDate <= possessionEndDate) {
                    dates.push({
                        date: currentDate.toLocaleDateString(),
                        valeur: calculateValeurActuelle(possession, currentDate.toISOString().split('T')[0]),
                    });

                    // Increment date by the selected period (daily or weekly)
                    currentDate.setDate(currentDate.getDate() + (selectedJour === 'Week' ? 7 : 1));
                }

                return dates;
            });

            const formattedData = filteredData.flat();
            setData(formattedData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4 text-center">Graphique de Patrimoine</h1>
            <Form className="d-flex justify-content-center mb-4">
                <Form.Group className="mx-2">
                    <Form.Label>Date Début</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mx-2">
                    <Form.Label>Date Fin</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mx-2">
                    <Form.Label>Jour</Form.Label>
                    <Form.Select value={selectedJour} onChange={(e) => setSelectedJour(e.target.value)}>
                        <option value="">Sélectionner</option>
                        <option value="Day">Jour</option>
                        <option value="Week">Semaine</option>
                    </Form.Select>
                </Form.Group>
                <Button className="align-self-end mx-2" onClick={handleValidate}>
                    Valider
                </Button>
            </Form>
            <LineChart data={data} />
        </div>
    );
};

export default PatrimoinePage;
