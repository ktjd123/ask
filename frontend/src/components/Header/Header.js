import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'

const Header = () => {

    const loginRegex = /(login|register)/
    let leftButton = (
        <Link to="/login">내 애스크</Link>
    )
    if(loginRegex.test(window.location.href)){
        leftButton = undefined
    }
    return (
        <div className="header">
            <div className='left'>
                {leftButton}
            </div>
            <Link to='/' className='logo'>ASKED</Link>
            <div className="right">

            </div>
        </div>
    );
};

export default Header;