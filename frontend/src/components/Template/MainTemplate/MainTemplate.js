import React from 'react';
import {Header} from 'components'
import './MainTemplate.css'

const MainTemplate = ({Profile, name, Ask, Menu, value, count, awI, awICount, onChange, onToggle, selected,posts ,CardList}) => {
    return (
        <div className='mainTemplate'>
            <Header/>
            <section className='profile'>
                <Profile name={name}/>
            </section>
            <section className='ask'>
                <Ask value={value} onChange={onChange} count={count}/>
            </section>
            <section className='menu'>
                <Menu onToggle={onToggle} selected={selected}/>
            </section>
            <section className='cardContainer'>
                <CardList posts={posts} awI={awI} awICount={awICount} onChange={onChange}/>
            </section>
        </div>
    );
};

export default MainTemplate;