import React from 'react';
import './Menu.css'

class Menu extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.selected !== this.props.selected){
            return true
        }
        return false
    }
    

    render() {
        const {onToggle, selected} = this.props
        return (
            <div className='menu'>
                <div className={`asked ${selected==="ask" && 'selected'}`} onClick={() => onToggle("ask")}>질문</div>
                <span className='hr'/>
                <div className={`answered ${selected==="answer" && 'selected'}`} onClick={() => onToggle("answer")}>답변</div>
            </div>
        );
    }
};

export default Menu;