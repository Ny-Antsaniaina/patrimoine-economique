import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListPossessionPage from './pages/ListPossessionPage';
import CreatePossessionPage from './pages/CreatePossessionPage';
import PatrimoinePage from './pages/PatrimoinePage';
import UpdatePossessionPage from './pages/UpdatePossessionPage';
import CustomNavbar from './components/Navbar';
function App() {
    return (
        <Router>
            <CustomNavbar />
            <div className="container ">

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/possessions" element={<ListPossessionPage />} />
                    <Route path="/possessions/create" element={<CreatePossessionPage />} />
                    <Route path="/patrimoine" element={<PatrimoinePage />} />
                    <Route path="/possessions/:libelle/update" element={<UpdatePossessionPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;