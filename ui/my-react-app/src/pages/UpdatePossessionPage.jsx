import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePossessionPage = () => {
    const { libelle } = useParams();
    const [dateFin, setDateFin] = useState('');
    const [currentLibelle, setCurrentLibelle] = useState('');
    const [newLibelle, setNewLibelle] = useState('');  // Définir newLibelle et setNewLibelle
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/data/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                const patrimoine = result.data.find(item => item.model === "Patrimoine");
                if (patrimoine && patrimoine.data && patrimoine.data.possessions) {
                    const possession = patrimoine.data.possessions.find(p => p.libelle === libelle);
                    if (possession) {
                        setDateFin(possession.dateFin || '');
                        setCurrentLibelle(possession.libelle);
                        setNewLibelle(possession.libelle);  // Initialiser newLibelle avec la valeur actuelle
                    }
                }
            })
            .catch(err => {
                console.error('Erreur lors du chargement des données', err);
                setError('Erreur lors du chargement des données.');
            });
    }, [libelle]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/possessions/${libelle}`, {
                libelle: newLibelle.trim() !== '' ? newLibelle : libelle,
                dateFin: dateFin,
            });
            navigate('/possessions');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la possession', error);
            setError('Erreur lors de la mise à jour de la possession. Veuillez réessayer.');
        }
    };

    return (
        <div className="container">
            <h1 className="display-2 text-center my-2 text-primary">Update Possession</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formLibelle">
                    <Form.Label>Libellé</Form.Label>
                    <Form.Control type="text" value={newLibelle} onChange={(e) => setNewLibelle(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formDateFin">
                    <Form.Label>Date Fin</Form.Label>
                    <Form.Control type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Update
                </Button>
            </Form>
        </div>
    );
}

export default UpdatePossessionPage;
