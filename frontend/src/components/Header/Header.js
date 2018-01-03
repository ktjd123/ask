import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'

const Header = () => {

    const loginRegex = /(login|register)/
    let leftButton = (
        <Link to="/login" className='my'>내 애스크</Link>
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
                <Link to='/' className="loginB">로그인</Link>
            </div>
        </div>
    );
};

export default Header;