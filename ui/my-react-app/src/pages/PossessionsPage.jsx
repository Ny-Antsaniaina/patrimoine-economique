import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PossessionsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h1>Possessions Page</h1>
            <Button className="m-3" onClick={() => navigate('/possessions/list')}>
                View Possessions
            </Button>
            <Button className="m-3" onClick={() => navigate('/possessions/create')}>
                Create New Possession
            </Button>
        </div>
    );
};

export default PossessionsPage;
