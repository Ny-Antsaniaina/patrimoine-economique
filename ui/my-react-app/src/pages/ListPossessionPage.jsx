import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ListPossessionPage = () => {
    const [possessions, setPossessions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [totalValue, setTotalValue] = useState(0);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [nouvelleLibelle , setNouvelleLibelle] = useState('');
    const [nouvelleDateFin, setNouvelleDateFin] = useState('');

    useEffect(() => {
        const fetchPossessions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/possessions');

                const data = response.data.data;

                if (Array.isArray(data) && data.length > 0) {
                    const possessions = data[0].data.possessions;
                    if (Array.isArray(possessions)) {
                        setPossessions(possessions);
                    } else {
                        console.error('Les possessions ne sont pas un tableau.');
                    }
                } else {
                    console.error('Les données ne sont pas dans le format attendu.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des possessions', error);
                setError('Erreur lors de la récupération des possessions.');
            }
        };

        fetchPossessions();
    }, []);

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

    const handleCalculate = () => {
        const total = possessions.reduce((acc, possession) => {
            const valeurActuelle = calculateValeurActuelle(possession, selectedDate);
            return acc + (isNaN(valeurActuelle) ? 0 : valeurActuelle);
        }, 0);
        setTotalValue(total);
    };

    // const handleUpdate = async (libelle) => {
    //     try {
    //
    //
    //         const updatedData = {
    //
    //             libelle: setNouvelleLibelle,
    //             dateFin: setNouvelleDateFin,
    //
    //         };
    //
    //         const response = await axios.put(`http://localhost:3000/api/possessions/${libelle}/update`, updatedData);
    //
    //         if (response.status === 200) {
    //             console.log('Possession mise à jour avec succès');
    //
    //         } else {
    //             console.error('Erreur lors de la mise à jour des données:', response);
    //             setError('Erreur lors de la mise à jour des données');
    //         }
    //     } catch (error) {
    //         console.error('Erreur lors du chargement des données:', error);
    //         setError('Erreur lors du chargement des données');
    //     }
    // };

    const handleUpdate = (libelle) =>{
        navigate(`http://localhost:3000/possessions/${libelle}/update`);
    }

    const handleClose = async (libelle) => {
        const dateFin = new Date().toISOString().split("T")[0];
        try {

            await axios.put(`http://localhost:3000/api/possessions/${libelle}/close`, { dateFin });


            const response = await axios.get('http://localhost:3000/api/possessions');
            const data = response.data.data;

            if (Array.isArray(data) && data.length > 0) {
                const patrimoine = data.find(item => item.model === 'Patrimoine');
                if (patrimoine && patrimoine.data && Array.isArray(patrimoine.data.possessions)) {
                    setPossessions(patrimoine.data.possessions);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la clôture de la possession:', error);
            setError('Erreur lors de la clôture de la possession. Veuillez réessayer.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4 text-center">Liste des Possessions</h1>
            <Table className='table table-dark table-hover table-striped mt-4'>
                <thead>
                <tr>
                    <th>Libelle</th>
                    <th>Valeur Initiale</th>
                    <th>Date Debut</th>
                    <th>Date Fin</th>
                    <th>Amortissement</th>
                    <th>Valeur Actuelle</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {possessions.map((possession, index) => (
                    <tr key={index}>
                        <td>{possession.libelle}</td>
                        <td>{possession.valeur}</td>
                        <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                        <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A'}</td>
                        <td>{possession.tauxAmortissement}</td>
                        <td>{calculateValeurActuelle(possession, selectedDate).toFixed(2)}</td>
                        <td>
                            {/*<Button className="btn btn-warning mx-1"*/}
                            {/*        onClick={() => handleUpdate(possession.libelle)}>Modifier</Button>*/}

                            <Link to={`/possessions/${possession.libelle}/update`} className="btn btn-warning mx-1">
                                Modifier
                            </Link>

                            <Button className="btn btn-danger mx-1"
                                    onClick={() => handleClose(possession.libelle)}>Clôturer</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="mb-3">
                <label className="form-label">Sélectionner la date</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="form-control"
                />
            </div>
            <Button className="mt-2 bg-success w-25" onClick={handleCalculate}>
                Calculer la Valeur Totale
            </Button>
            <h3>Valeur Totale du Patrimoine: {totalValue.toFixed(2)}  Ar</h3>

        </div>

    );
};

export default ListPossessionPage;
