import React, { Component } from 'react';
import './Card.css'

class Card extends Component {


    render() {
        const { data, awI, awICount, onChange, isMine } = this.props
        let answer = undefined
        let remove = undefined
        if (!isMine) {
            answer = (
                <div className='aw'>{data.answer}</div>
            )
        } else {
            if(typeof data.answer === 'undefined'){
                answer = (
                    <div className='awCon'>
                        <textarea className='awI' value={awI} onChange={onChange}>
                        </textarea>
                        <div className='count'>{awICount}/300</div>
                        <div className='submit'>완료</div>
                    </div>
                )
            }else{
                answer = (
                    <div className='aw'>{data.answer}</div>
                )
            }
            remove = (
                <div className='remove'>삭제</div>
            )
        }
        return (
            <div className='card'>
                <div className='info'>
                    <div className='who'>익명</div>
                    <div className='time'>1분전 작성</div>
                    {remove}
                </div>
                <div className='main'>
                    <div className='qs'>{data.question}</div>
                    {answer}
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