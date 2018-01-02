import React, { Component } from 'react';
import './Card.css'

class Card extends Component {
    render() {
        return (
            <div className='card'>
                <div className='info'>
                    <div className='who'>익명</div>
                    <div className='time'>1분전 작성</div>
                </div>
                <div className='main'>
                    <div className='qs'>제가 그때 왜 그랬는지 아세요?</div>
                    <div className='aw'>모르죠,,</div>
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