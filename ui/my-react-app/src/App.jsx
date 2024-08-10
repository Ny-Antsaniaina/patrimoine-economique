import {useEffect, useState} from 'react'
import './App.css'
import Possession from "../../../models/possessions/Possession.js";
import {Table , Button} from "react-bootstrap";


function App() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [possessionsData, setPossessionsData] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [possessions, setPossessions] = useState([]);

    useEffect(() => {
        fetch('/data/data.json')
            .then((reponse) => {
                let res = reponse.json();
                console.log(res)
                return res
            } )
            .then((result) => {
                const patrimoine = result.data.find((item) => item.model === "Patrimoine");
                console.log(patrimoine);
                if (patrimoine && patrimoine.data && patrimoine.data.possessions){
                    setPossessionsData(patrimoine.data.possessions);
                }else {
                    console.error("data incorrecte");
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);



    const calculateValeurActuelle = (possession , date)=>{
        const dateDebut = new Date(possession.dateDebut);
        const  dateActuelle = new Date(date);

        const differenceDate = {
            year: dateActuelle.getFullYear() - dateDebut.getFullYear(),
            month: dateActuelle.getMonth() - dateDebut.getMonth(),
            day: dateActuelle.getDate() - dateDebut.getDate(),
        };
        let raison = differenceDate.year + differenceDate.month / 12 + differenceDate.day / 365

        return possession.valeur - possession.valeur * (raison * possession.tauxAmortissement / 100);
    }

    const  handleCalculate = () => {
        const total = possessionsData.reduce((acc, possession) => {
            const valeurActuelle = calculateValeurActuelle(possession, selectedDate);
            return acc + (isNaN(valeurActuelle) ? 0 : valeurActuelle);
        }, 0);

        setTotalValue(total);
    };

    return (
        <div className="container ">
            <h1 className='display-2 text-center my-2 text-primary'>Possessions</h1>
            <Table className='table table-dark table-hover table-striped '>
                <thead>
                <tr>
                    <th>Libelle</th>
                    <th>Valeur Initiale</th>
                    <th>Date Debut</th>
                    <th>Date Fin</th>
                    <th>Amortissement</th>
                    <th>Valeur Actuelle</th>
                </tr>
                </thead>
                <tbody>
                {possessionsData.map((possession , index) => {
                    const thevalue = new Possession(possession.possesseur,
                        possession.libelle,
                        possession.valeur,
                        new Date(possession.dateDebut),
                        new Date(possession.dateFin),
                        possession.tauxAmortissement);


                    return (
                        <tr key={index}>
                            <td>{thevalue.libelle}</td>
                            <td>{thevalue.valeur}</td>
                            <td>{thevalue.dateDebut.toLocaleDateString()}</td>
                            <td className="text-danger">null</td>
                            <td>{thevalue.tauxAmortissement !== null ? thevalue.tauxAmortissement : 0}</td>
                            <td>{thevalue.getValeur(new Date())}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            <div className="mb-3">
                <h1  className="form-label">Select Date</h1>
                <input
                    type="date"
                    id="datePicker"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-50"
                />
            </div>
            <Button className="mt-2 bg-success w-25" onClick={handleCalculate}>
                Valider
            </Button>
            <h3 >Valeur du Patrimoine: {totalValue.toFixed(3)}</h3>
        </div>

    );
}

export default App;
