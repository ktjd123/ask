import React from 'react';
import {Header} from 'components'
import './MainTemplate.css'

const MainTemplate = ({Profile, isMine, name, Ask, onQuestion, Menu, value, count, awI, awICount, onAnswer, onChange, onToggle, selected,posts ,CardList, handleRemove,
postCount, nPostCount, randomUser, handleRandom
}) => {
    return (
        <div className='mainTemplate'>
            <Header randomUser={randomUser} handleRandom={handleRandom}/>
            <section className='profile'>
                <Profile name={name}/>
            </section>
            <section className='ask'>
                <Ask value={value} onChange={onChange} count={count} onQuestion={onQuestion}/>
            </section>
            <section className='menu'>
                <Menu onToggle={onToggle} selected={selected} postCount={postCount} nPostCount={nPostCount}/>
            </section>
            <section className='cardContainer'>
                <CardList posts={posts} awI={awI} awICount={awICount} onChange={onChange} isMine={isMine} onAnswer={onAnswer} onRemove={handleRemove}/>
            </section>
        </div>
    );
};

export default MainTemplate;