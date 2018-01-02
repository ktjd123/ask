import React, { Component } from 'react';
import './Login.css'

class Login extends Component {

    render() {
        return (
            <div className='login'>
                <div className='input'>
                    <input placeholder="ID" className='id'/>
                    <input placeholder="PW" className='pw'/>
                </div>
                <div className='button'>
                    <div className='loginB'>로그인</div>
                    <div className='registerB'>회원가입</div>
                </div>
            </div>
        );
    }
}
export default Login;