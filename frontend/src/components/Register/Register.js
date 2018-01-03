import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Register.css'

class Register extends Component {
    render() {
        const {id, pw, name, email, onChange, onRegister} = this.props
        return (
            <div className='register'>
                <div className='input'>
                    <input placeholder="아이디" className='id' value={id} onChange={onChange} />
                    <input placeholder="비밀번호" type="password" className='pw' value={pw} onChange={onChange} />
                    <input placeholder='이름' type="name" className='name' value={name} onChange={onChange} />
                    <input placeholder="이메일" type="email" className='email' value={email} onChange={onChange} />
                </div>
                <div className='buttonR'>
                    <div className='registerB' onClick={onRegister}>회원가입</div>
                    <Link to='/login' className='cancelB'>취소</Link>
                </div>
            </div>
        );
    }
}

export default Register;