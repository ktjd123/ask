import React, { Component } from 'react';
import {RegisterTemplate, Registerc} from 'components'
import {connect} from 'react-redux'
import {registerRequest, getStatusRequest} from 'actions/authentication'
import {toast} from 'react-toastify'

class Register extends Component {

    state = {
        id: '',
        pw: '',
        name: '',
        email: ''
    }

    componentWillMount() {
        function getCookie(name) {
            let value = "; "+ document.cookie
            let parts = value.split("; " + name + "=")
            if(parts.length === 2) return parts.pop().split(';').shift();
        }
        let loginData = getCookie("key")
        if(typeof loginData === "undefined") return;
        loginData = JSON.parse(atob(loginData))
        if(!loginData.isLoggedIn) return;

        this.props.getStatusRequest().then(() => {
            if(this.props.mainStatus.valid){
                let loginData = {
                    isLoggedIn: true,
                    id: this.props.status.currentUser,
                    name: this.props.status.currentName
                }
                let date = new Date()
                date.setTime(date.getTime() + ( 365 * 24 * 60 * 60 * 1000))
                let expires = ";expires=" + date.toGMTString()
                let cookie = "key=" + btoa(JSON.stringify(loginData))+expires
                document.cookie = cookie
                this.props.history.push('/' + this.props.mainStatus.currentUser)
                return
            }
        })
    }

    handleChange = (e) => {
        switch(e.target.className){
            case 'id':
            this.setState({id: e.target.value})
            break

            case 'pw':
            this.setState({pw: e.target.value})
            break

            case 'name':
            this.setState({name: e.target.value})
            break

            case 'email':
            this.setState({email: e.target.value})
            break

            default:
            break
        }
    }
    handleRegister = () => {
        const {id, pw, name, email} = this.state
        this.props.registerRequest(id, pw, name, email).then(() => {
            if(this.props.status === 'SUCCESS'){
                toast.success('완료됐습니다! 로그인해주세요!')
                this.props.history.push('/login')
            }else{
                let errorMessage = [
                   "문자, 숫자만 넣어주세요",
                   '존재하는 아이디입니다.',
                   '존재하는 이메일입니다.'
                ]
                toast.error(errorMessage[this.props.errorCode])
            }
        })
    }

    render() {
        const {id, pw, name, email} = this.state
        const {
            handleChange,
            handleRegister
        } = this
        return (
            <div>
                <RegisterTemplate Register={Registerc} id={id} pw={pw} name={name} email={email} onChange={handleChange} onRegister={handleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error,
        mainStatus: state.authentication.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerRequest: (id, pw, name, email) => {
            return dispatch(registerRequest(id, pw, name, email))
        },
        getStatusRequest: () => {
            return dispatch(getStatusRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);