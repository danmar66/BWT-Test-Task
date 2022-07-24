import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (<div>
        <nav className="d-flex justify-content-center align-items-center bg-dark">
            <ul className="nav">
                <li className="nav-item m-3"><Link to={'/'}>Conference List</Link></li>
            </ul>
        </nav>
    </div>);
};

export default Header;