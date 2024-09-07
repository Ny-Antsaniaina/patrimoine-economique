
import axios from 'axios';

const API_URL = 'https://myprojetreactback.onrender.com/api'; // Remplace par l'URL de ton backend


export const getPossessions = () => {
    return axios.get(`${API_URL}/possessions`);
};


