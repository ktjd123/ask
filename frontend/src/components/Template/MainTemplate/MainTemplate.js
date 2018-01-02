import React from 'react';
import {Header} from 'components'
import './MainTemplate.css'

const MainTemplate = ({Profile, Ask, Menu, value, count, onChange, onToggle, selected, CardList}) => {
    return (
        <div className='mainTemplate'>
            <Header/>
            <section className='profile'>
                <Profile/>
            </section>
            <section className='ask'>
                <Ask value={value} onChange={onChange} count={count}/>
            </section>
            <section className='menu'>
                <Menu onToggle={onToggle} selected={selected}/>
            </section>
            <section className='cardContainer'>
                <CardList/>
            </section>
        </div>
    );
};

export default MainTemplate;