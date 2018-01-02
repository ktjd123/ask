import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'

const Header = () => {

    const loginRegex = /(login|register)/
    let rightButton = (
        <a><i className="material-icons log-out">lock_open</i></a>
    )
    let leftButton = (
        <a>내 애스크</a>
    )
    if(loginRegex.test(window.location.href)){
        rightButton = undefined
        leftButton = undefined
    }
    return (
        <div className="header">
            <div className='left'>
                {leftButton}
            </div>
            <Link to='/' className='logo'>ASKED</Link>
            <div className="right">
                {rightButton}
            </div>
        </div>
    );
};

export default Header;