import React from 'react';
import {Header} from 'components'
import './MainTemplate.css'

const MainTemplate = ({Profile, isMine, name, Ask, onQuestion, Menu, value, count, awI, awICount, onChange, onToggle, selected,posts ,CardList}) => {
    return (
        <div className='mainTemplate'>
            <Header/>
            <section className='profile'>
                <Profile name={name}/>
            </section>
            <section className='ask'>
                <Ask value={value} onChange={onChange} count={count} onQuestion={onQuestion}/>
            </section>
            <section className='menu'>
                <Menu onToggle={onToggle} selected={selected}/>
            </section>
            <section className='cardContainer'>
                <CardList posts={posts} awI={awI} awICount={awICount} onChange={onChange} isMine={isMine}/>
            </section>
        </div>
    );
};

export default MainTemplate;