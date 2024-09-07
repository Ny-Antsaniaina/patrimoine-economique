import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePossessionPage = () => {
    const { libelle } = useParams();
    const [dateFin, setDateFin] = useState('');
    const [newLibelle, setNewLibelle] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPossession = async () => {
            try {
                const response = await fetch('/data/data.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                const patrimoine = result.data.find(item => item.model === "Patrimoine");
                if (patrimoine && patrimoine.data && patrimoine.data.possessions) {
                    const possession = patrimoine.data.possessions.find(p => p.libelle === libelle);
                    if (possession) {
                        setDateFin(possession.dateFin || '');
                        setNewLibelle(possession.libelle || '');
                    }
                }
            } catch (err) {
                console.error('Erreur lors du chargement des données', err);
                setError('Erreur lors du chargement des données.');
            }
        };

        fetchPossession();

    }, [libelle]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                libelle: newLibelle.trim() !== '' ? newLibelle : libelle,
                dateFin: dateFin,
            };


            const response = await axios.put(`http://localhost:3000/api/possessions/${libelle}/update`, updatedData);

            if (response.status === 200) {
                navigate('/possessions');
            } else {
                setError('Erreur lors de la mise à jour de la possession. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la possession', error);
            setError('Erreur lors de la mise à jour de la possession. Veuillez réessayer.');
        }
    };

    return (
        <div className="container">
            <h1 className="display-2 text-center my-4 text-primary">Modifier la Possession</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <h1>Modifier la possession: {libelle}</h1>
                <Form.Group controlId="formLibelle">
                    <Form.Label>Libellé</Form.Label>
                    <Form.Control
                        type="text"
                        value={newLibelle}
                        onChange={(e) => setNewLibelle(e.target.value)}
                        placeholder="Entrez le nouveau libellé"
                    />
                </Form.Group>
                <Form.Group controlId="formDateFin">
                    <Form.Label>Date Fin</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Mettre à jour
                </Button>
            </Form>
        </div>
    );
}

export default UpdatePossessionPage;
