import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className="header">
            <div className='left'></div>
            <Link to='/' className='logo'>ASKED</Link>
            <div className="right"></div>
        </div>
    );
};

export default Header;