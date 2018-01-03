import React, { Component } from 'react';
import TimeAgo from 'react-timeago'
import koreanString from 'react-timeago/lib/language-strings/ko'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
 
import './Card.css'

class Card extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props !== nextProps){
            return true
        }
        return false
    }
    

    render() {
        const { data, awI, awICount, onChange, isMine, onAnswer, onRemove} = this.props
        let answer = undefined
        let remove = undefined
        const formatter = buildFormatter(koreanString)
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
                        <div className='submit' onClick={() => onAnswer(data._id)}>완료</div>
                    </div>
                )
            }else{
                answer = (
                    <div className='aw'>{data.answer}</div>
                )
            }
            remove = (
                <div className='remove' onClick={() => onRemove(data._id)}>삭제</div>
            )
        }
        return (
            <div className='card'>
                <div className='info'>
                    <div className='who'>익명</div>
                    <div className='time'><TimeAgo date={data.time} formatter={formatter}/></div>
                    {remove}
                </div>
                <div className='main'>
                    <div className='qs'>{data.question}</div>
                    {answer}
                </div>

                {/* <div className='add'>
                    <a><i className='material-icons'>star_border</i></a>
                    <div className='amount'>32</div>
                </div> */}

            </div>
        );
    }
}

export default Card;