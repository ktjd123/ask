import React from 'react';
import './Ask.css'

const Ask = ({value, onChange, count, onQuestion}) => {
    return (
        <div className='ask'>
            <textarea value={value} onChange={onChange}>
                
            </textarea>
            <div className='count'>{count}/300</div>
            <span className='hr'/>
            <div className='send' onClick={onQuestion}>질문하기</div>
            <p className='description'>
                얼굴을 마주보고 말하기 힘든 것들을 질문해보세요!
            </p>
        </div>
    );
};

export default Ask;