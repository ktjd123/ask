import React, { Component } from 'react';
import {LoginTemplate, Loginc} from 'components'
import {connect} from 'react-redux'
import { loginRequest,getStatusRequest } from 'actions/authentication'
import {toast} from 'react-toastify'

class Login extends Component {

    state = {
        id: '',
        pw: ''
    }

    
    componentWillMount() {
        this.props.getStatusRequest().then(() => {
            if(this.props.mainStatus.valid){
                this.props.history.push('/' + this.props.mainStatus.currentUser)
                return
            }
        })
    }
    

    handleChange = e => {
        if(e.target.className === 'id'){
            if(e.target.value.length > 10) return
            this.setState({
                id: e.target.value
            })
        }else{
            if(e.target.value.length > 20) return
            this.setState({
                pw: e.target.value
            })
        }
    }

    handleLogin = () => {
        const {id, pw} = this.state
        this.props.loginRequest(id, pw).then(() => {
            if(this.props.status === 'SUCCESS') {
                toast.success('로그인 완료!')

                // todo 추후 메인 페이지 또는 로그인 전 페이지로 변경
                this.props.history.push('/'+this.props.mainStatus.currentUser)
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
        status: state.authentication.login.status,
        mainStatus: state.authentication.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw))
        },
        getStatusRequest: () => {
            return dispatch(getStatusRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);