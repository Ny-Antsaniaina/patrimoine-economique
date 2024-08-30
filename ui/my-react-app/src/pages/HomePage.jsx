import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h1 className="display-3 mb-4">Gestion de Patrimoine</h1>
            <Button
                className="m-2"
                onClick={() => navigate('/possessions')}
                variant="primary"
                size="lg"
            >
                Gérer les Possessions
            </Button>
            <Button
                className="m-2"
                onClick={() => navigate('/patrimoine')}
                variant="secondary"
                size="lg"
            >
                Voir le Patrimoine
            </Button>
        </div>
    );
};

export default HomePage;
