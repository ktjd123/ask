import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Register.css'

class Register extends Component {
    render() {
        return (
            <div className='register'>
                <div className='input'>
                    <input placeholder="아이디" className='id' />
                    <input placeholder="비밀번호" type="password" className='pw' />
                    <input placeholder='이름' className='name' />
                    <input placeholder="이메일" className='email' />
                </div>
                <div className='buttonR'>
                    <div className='registerB'>회원가입</div>
                    <Link to='/login' className='cancelB'>취소</Link>
                </div>
                주의사항 이용약관 박스 아래에 넣기
            </div>
        );
    }
}

export default Register;