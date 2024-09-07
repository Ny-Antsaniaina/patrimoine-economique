import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;


app.use(cors());


app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname,'..','ui','my-react-app','public', 'data', 'data.json');


const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
};


app.get('/api/possessions', async (req, res) => {
    try {
        const data = await readData();
        res.status(200).json(data);
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
    }
});


app.post('/api/possessions', async (req, res) => {
    try {
        const newPossession = req.body;
        const data = await readData();
        data.data[0].data.possessions.push(newPossession);

        fs.writeFile(dataPath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier:', err);
                return res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier' });
            }
            res.status(201).json(newPossession);
        });
    } catch (error) {
        console.error('Erreur lors de la création de la possession:', error);
        res.status(500).json({ error: 'Erreur lors de la création de la possession' });
    }
});


app.post('/api/possessions/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    const { libelle: newLibelle, dateFin } = req.body;


    const possession = possessions.find(p => p.libelle === libelle);
    if (!possession) {
        return res.status(404).json({ error: "Possession non trouvée" });
    }

    possession.libelle = newLibelle;
    possession.dateFin = dateFin;


    res.status(200).json({ message: "Possession mise à jour avec succès" });
});

// app.put('/api/possessions/:libelle/update', (req, res) => {
//     const { libelle } = req.params;
//     const updatedData = req.body;
//
//     const dataFilePath = path.join(__dirname,'public','data','data.json');
//
//     fs.readFile(dataFilePath, 'utf-8', (err, data) => {
//         if (err) {
//             console.error('Erreur lors de la lecture du fichier:', err);
//             return res.status(500).json({ error: 'Erreur lors de la lecture des données' });
//         }
//
//         let jsonData;
//         try {
//             jsonData = JSON.parse(data);
//         } catch (parseErr) {
//             console.error('Erreur lors du parsing du JSON:', parseErr);
//             return res.status(500).json({ error: 'Erreur lors du parsing des données' });
//         }
//         let possessions = jsonData.data[0].data.possessions;
//
//
//         let index = possessions.findIndex(p => p.libelle === libelle);
//
//         if (index === -1) {
//             return res.status(404).json({ error: 'Possession non trouvée.' });
//         }
//
//         possessions[index] = { ...possessions[index], ...updatedData };
//
//
//         fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
//             if (err) {
//                 console.error("Erreur lors de l'écriture du fichier:", err);
//                 return res.status(500).json({ error: 'Erreur lors de la sauvegarde des données' });
//             }
//
//             res.status(200).json({ message: 'Possession mise à jour avec succès.' });
//         });
//     });
// });


app.put('/api/possessions/:libelle/update', async (req, res) => {
    const { libelle } = req.params;
    const updatedData = req.body;

    try {
        const data = await readData();
        const possessions = data.data[0].data.possessions;
        const index = possessions.findIndex(p => p.libelle === libelle);

        if (index === -1) {
            return res.status(404).json({ error: 'Possession non trouvée.' });
        }

        possessions[index] = { ...possessions[index], ...updatedData };

        fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier:', err);
                return res.status(500).json({ error: 'Erreur lors de la mise à jour de la possession' });
            }

            res.status(200).json({ message: 'Possession mise à jour avec succès.' });
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la possession:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la possession' });
    }
});


// app.put('/api/possessions/:libelle/close', (req, res) => {
//     const { libelle } = req.params;
//     const { dateFin } = req.body;
//
//
//     const dataFilePath = path.join(__dirname, 'public/data/data.json');
//
//     fs.readFile(dataFilePath, 'utf-8', (err, data) => {
//         if (err) {
//             console.error('Erreur lors de la lecture du fichier:', err);
//             return res.status(500).json({ error: 'Erreur lors de la lecture des données' });
//         }
//
//         let jsonData;
//         try {
//             jsonData = JSON.parse(data);
//         } catch (parseErr) {
//             console.error('Erreur lors du parsing du JSON:', parseErr);
//             return res.status(500).json({ error: 'Erreur lors du parsing des données' });
//         }
//
//         const patrimoine = jsonData.data.find(item => item.model === 'Patrimoine');
//         if (patrimoine && patrimoine.data && patrimoine.data.possessions) {
//             const possession = patrimoine.data.possessions.find(p => p.libelle === libelle);
//             if (possession) {
//                 possession.dateFin = dateFin;
//                 fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
//                     if (err) {
//                         console.error('Erreur lors de la mise à jour des données:', err);
//                         return res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
//                     }
//                     res.json({ message: 'Possession mise à jour avec succès' });
//                 });
//             } else {
//                 console.error('Possession non trouvée');
//                 res.status(404).json({ error: 'Possession non trouvée' });
//             }
//         } else {
//             console.error('Patrimoine non trouvé');
//             res.status(404).json({ error: 'Patrimoine non trouvé' });
//         }
//     });
// });

app.put('/api/possessions/:libelle/close', async (req, res) => {
    const { libelle } = req.params;
    const { dateFin } = req.body;

    try {
        const data = await readData();
        const possessions = data.data[0].data.possessions;
        const index = possessions.findIndex(p => p.libelle === libelle);

        if (index === -1) {
            return res.status(404).json({ error: 'Possession non trouvée.' });
        }

        possessions[index].dateFin = dateFin;

        fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier:', err);
                return res.status(500).json({ error: 'Erreur lors de la clôture de la possession' });
            }

            res.status(200).json({ message: 'Possession clôturée avec succès.' });
        });
    } catch (error) {
        console.error('Erreur lors de la clôture de la possession:', error);
        res.status(500).json({ error: 'Erreur lors de la clôture de la possession' });
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});