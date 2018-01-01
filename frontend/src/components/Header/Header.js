import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className="header">
            <div className='left'></div>
            <Link to='/' className='logo'>ASKED</Link>
            <div className="right">
                <a><i className="material-icons log-out">lock_open</i></a>
            </div>
        </div>
    );
};

export default Header;