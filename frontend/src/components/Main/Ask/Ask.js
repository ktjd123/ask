import React from 'react';
import './Ask.css'

const Ask = ({value, onChange, count, onQuestion, name}) => {
    return (
        <div className='ask'>
            <textarea value={value} onChange={onChange} placeholder={`${name}님에게 익명으로 질문을 남겨보세요!`}>
                
            </textarea>
            <div className='count'>{count}/300</div>
            <span className='hr'/>
            <div className='send' onClick={onQuestion}>질문하기</div>
            <p className='description'>
                얼굴을 마주보고 말하기 힘든 것들을 질문해보세요!<br/>
                SNS에 공유하고 익명으로 질문을 받아보세요!
            </p>
        </div>
    );
};

export default Ask;