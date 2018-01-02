import React, { Component } from 'react';
import {LoginTemplate, Loginc} from 'components'
import {connect} from 'react-redux'
import { loginRequest } from 'actions/authentication'
import {toast} from 'react-toastify'

class Login extends Component {

    state = {
        id: '',
        pw: ''
    }

    handleChange = e => {
        if(e.target.className === 'id'){
            this.setState({
                id: e.target.value
            })
        }else{
            this.setState({
                pw: e.target.value
            })
        }
    }

    handleLogin = () => {
        const {id, pw} = this.state
        this.props.loginRequest(id, pw).then(() => {
            if(this.props.status === 'SUCCESS') {
                let loginData = {
                    isLoggedIn: true,
                    username: id
                }
                let date = new Date()
                date.setTime(date.getTime() + ( 365 * 24 * 60 * 60 * 1000))
                let expires = ";expires=" + date.toGMTString()
                let cookie = "key=" + btoa(JSON.stringify(loginData))+expires
                document.cookie = cookie
                
                toast.success('로그인 완료!')

                // todo 추후 메인 페이지 또는 내 페이지로 변경
                this.props.history.push('/')
            }else{
                toast.error('아이디 또는 비밀번호를 확인해주세요')
                this.setState({
                    id: '',
                    pw: ''
                })
            }
        })
    }

    render() {
        const {id, pw} = this.state
        const {
            handleChange,
            handleLogin
        } = this
        return (
            <div>
                <LoginTemplate Login={Loginc} id={id} pw={pw} onChange={handleChange} onLogin={handleLogin}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.authentication.login.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);