
import React, { useState, useEffect } from 'react';
import LineChart from '../components/LineChart';
import { Form, Button } from 'react-bootstrap';
import Possession from '../../models/possessions/Possession.js';
import Argent from '../../models/possessions/Argent.js';
import BienMateriel from '../../models/possessions/BienMateriel.js';
import Flux from '../../models/possessions/Flux.js';
import Patrimoine from '../../models/Patrimoine.js';
import Personne from '../../models/Personne.js';

const PatrimoinePage = () => {
    const [data, setData] = useState([]);
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [selectedJour, setSelectedJour] = useState('');

    const handleValidate = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/possessions');
            const result = await response.json();
            const possessionsData = result.data[0].data.possessions;

            const possesseur = new Personne("Nom de la personne");

            const possessions = possessionsData.map(data => {
                if (data.type === "Argent") {
                    return new Argent(possesseur, data.libelle, data.valeur, new Date(data.dateDebut), new Date(data.dateFin), data.tauxAmortissement, data.type);
                } else if (data.type === "BienMateriel") {
                    return new BienMateriel(possesseur, data.libelle, data.valeur, new Date(data.dateDebut), new Date(data.dateFin), data.tauxAmortissement);
                } else if (data.type === "Flux") {
                    return new Flux(possesseur, data.libelle, data.valeur, new Date(data.dateDebut), new Date(data.dateFin), data.tauxAmortissement, selectedJour);
                } else {
                    return new Possession(possesseur, data.libelle, data.valeur, new Date(data.dateDebut), new Date(data.dateFin), data.tauxAmortissement);
                }
            });

            const patrimoine = new Patrimoine(possesseur, possessions);

            const startDate = new Date(dateDebut);
            const endDate = new Date(dateFin);

            let dates = [];
            let currentDate = startDate;

            while (currentDate <= endDate) {
                dates.push({
                    date: currentDate.toLocaleDateString(),
                    valeur: patrimoine.getValeur(currentDate)
                });

                currentDate.setDate(currentDate.getDate() + (selectedJour === 'Week' ? 7 : 1));
            }

            setData(dates);
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
