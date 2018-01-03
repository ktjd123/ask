import React from 'react';
import './Menu.css'

class Menu extends React.Component {

    render() {
        const { onToggle, selected, postCount, nPostCount } = this.props
        return (
            <div className='menu'>
                <div className='con' onClick={() => onToggle("ask")}>
                    <div className='count'>{postCount}</div>
                    <div className={`asked ${selected === "ask" && 'selected'}`} >답변완료</div>
                </div>
                <span className='hr' />
                <div className='con'  onClick={() => onToggle("answer")}>
                    <div className='count'>{nPostCount}</div>
                    <div className={`answered ${selected === "answer" && 'selected'}`}>미답변</div>
                </div>
            </div>
        );
    }
};

export default Menu;