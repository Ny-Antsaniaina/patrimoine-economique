import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col,  } from 'react-bootstrap';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="text-center bg-transparent h-75" >
                <h1 className="display-3 mb-4 font-weight-bold text-primary">
                    Gestion de Patrimoine
                </h1>
                <p className="lead text-secondary mb-5">
                    Gérer vos possessions et visualiser votre patrimoine en toute simplicité.
                </p>
                <Row>
                    <Col className="mb-3">
                        <Button
                            onClick={() => navigate('/possessions')}
                            variant="primary"
                            size="lg"
                            className="btn-custom px-5 py-3 shadow-lg"
                        >
                            Possessions
                        </Button>
                    </Col>
                    <Col className="mb-3">
                        <Button
                            onClick={() => navigate('/patrimoine')}
                            variant="secondary"
                            size="lg"
                            className="btn-custom px-5 py-3 shadow-lg"
                        >
                             Patrimoine
                        </Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default HomePage;
