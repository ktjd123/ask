import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Login.css'

class Login extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.id === nextProps.id && this.props.pw === nextProps.pw){
            return false
        }
        return true
    }
    
    render() {
        const {onChange, id, pw, onLogin} = this.props
        return (
            <div className='login'>
                <div className='input'>
                    <input placeholder="아이디" className='id' value={id} onChange={onChange}/>
                    <input placeholder="비밀번호" type="password" className='pw' value={pw} onChange={onChange}/>
                </div>
                <div className='buttonL'>
                    <div className='loginB' onClick={onLogin}>로그인</div>
                    <Link to='/register' className='registerB'>회원가입</Link>
                    답변하려면 로그인이 필요합니다.
                </div>
            </div>
        );
    }
}
export default Login;