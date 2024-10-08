
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';

const CreatePossessionPage = () => {
    const [formData, setFormData] = useState({
        libelle: '',
        valeur: '',
        dateDebut: '',
        dateFin: '',
        tauxAmortissement: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/possessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const result = await response.json();
            console.log('Possession créée avec succès', result);
            setFormData({
                libelle: '',
                valeur: '',
                dateDebut: '',
                dateFin: '',
                tauxAmortissement: ''
            });
            navigate('/possessions');
        } catch (error) {
            console.error('Erreur lors de la création de la possession', error.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="shadow-lg p-4" >
                <Card.Body>
                    <h2 className="text-center mb-4">Créer une Nouvelle Possession</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="libelle">
                            <Form.Label>Libelle</Form.Label>
                            <Form.Control
                                type="text"
                                name="libelle"
                                value={formData.libelle}
                                onChange={handleChange}
                                placeholder="Entrez le libelle"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="valeur" className="mt-3">
                            <Form.Label>Valeur</Form.Label>
                            <Form.Control
                                type="number"
                                name="valeur"
                                value={formData.valeur}
                                onChange={handleChange}
                                placeholder="Entrez la valeur"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="dateDebut" className="mt-3">
                            <Form.Label>Date Début</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateDebut"
                                value={formData.dateDebut}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="dateFin" className="mt-3">
                            <Form.Label>Date Fin</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateFin"
                                value={formData.dateFin}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="tauxAmortissement" className="mt-3">
                            <Form.Label>Taux Amortissement (%)</Form.Label>
                            <Form.Control
                                type="number"
                                name="tauxAmortissement"
                                value={formData.tauxAmortissement}
                                onChange={handleChange}
                                placeholder="Entrez le taux d'amortissement"
                                required
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100 mt-4">
                            Créer
                        </Button>
                    </Form>

                </Card.Body>
            </Card>
        </Container>
    );
};

export default CreatePossessionPage;
