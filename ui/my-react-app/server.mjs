import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialisation de l'application Express
const app = express();
const port = 3000;

// Configuration de CORS pour permettre les requêtes depuis le frontend
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Chemin pour accéder au fichier data.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'public', 'data', 'data.json');

// Fonction pour lire les données du fichier JSON
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

// Route pour obtenir les possessions
app.get('/api/possessions', async (req, res) => {
    try {
        const data = await readData();
        res.status(200).json(data);
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
        res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
    }
});

// Route pour créer une nouvelle possession
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

    // Logique pour trouver et mettre à jour la possession
    const possession = possessions.find(p => p.libelle === libelle);
    if (!possession) {
        return res.status(404).json({ error: "Possession non trouvée" });
    }

    possession.libelle = newLibelle;
    possession.dateFin = dateFin;

    // Sauvegarde des modifications (par exemple, en écrivant dans un fichier JSON ou en mettant à jour une base de données)

    res.status(200).json({ message: "Possession mise à jour avec succès" });
});


// Route pour clore une possession
app.put('/api/possessions/:libelle', (req, res) => {
    const { libelle } = req.params;
    const { dateFin } = req.body;

    fs.readFile(path.join(__dirname, 'data/data.json'), 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur lors de la lecture des données' });
        }

        let jsonData = JSON.parse(data);
        const patrimoine = jsonData.data.find(item => item.model === 'Patrimoine');
        if (patrimoine && patrimoine.data && patrimoine.data.possessions) {
            const possession = patrimoine.data.possessions.find(p => p.libelle === libelle);
            if (possession) {
                possession.dateFin = dateFin;
                fs.writeFile(path.join(__dirname, 'data/data.json'), JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
                    }
                    res.json({ message: 'Possession mise à jour avec succès' });
                });
            } else {
                res.status(404).json({ error: 'Possession non trouvée' });
            }
        } else {
            res.status(404).json({ error: 'Patrimoine non trouvé' });
        }
    });
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
