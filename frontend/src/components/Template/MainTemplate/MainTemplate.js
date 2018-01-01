import React from 'react';
import {Header, Profile} from 'components'
import './MainTemplate.css'

const MainTemplate = () => {
    return (
        <div className='mainTemplate'>
            <Header/>
            <section className='profile'>
                <Profile/>
            </section>
        </div>
    );
};

export default MainTemplate;