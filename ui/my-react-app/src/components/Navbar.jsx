// import React from 'react';
// import { Link } from 'react-router-dom';
//
// function Navbar() {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//                 <Link className="navbar-brand" to="/">Patrimoine</Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/add-possession">Ajouter Possession</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/possessions">Afficher Possessions</Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// src/components/NavigationComponent.jsx

import { Link } from 'react-router-dom';

const NavigationComponent = () => {
    return (
        <nav>
            <Link to="/possession/create">Créer une nouvelle possession</Link>
            <Link to="/possession">Voir les possessions</Link>
        </nav>
    );
};



export default Navbar;
