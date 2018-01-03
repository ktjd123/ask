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
            <p className='description'>질문되는 내용은 내부적으로 기록이 되고 있지만 답변자는 확인 할 수 없습니다.
                <br/>하지만 수사기관, 본인의 요청이 있고 ASK의 <a className='dis'>이용약관</a>에 위배된다고 판단될 경우 질문자의 정보가 제공될 수 있습니다.
            </p>
        </div>
    );
};

export default Ask;