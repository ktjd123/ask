import React, { Component } from 'react';
import './Card.css'

class Card extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.data === nextProps.data){
            return false
        }
        return true
    }
    
    render() {
        const {data} = this.props
        return (
            <div className='card'>
                <div className='info'>
                    <div className='who'>익명</div>
                    <div className='time'>1분전 작성</div>
                </div>
                <div className='main'>
                    <div className='qs'>{data.question}</div>
                    <div className='aw'>{data.answer}</div>
                </div>
                <div className='add'>
                    <a><i className='material-icons'>star_border</i></a>
                    <div className='amout'>32</div>
                </div>
            </div>
        );
    }
}

export default Card;