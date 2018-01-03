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
        this.props.getStatusRequest().then(() => {
            if(this.props.mainStatus.valid){
                this.props.history.push('/')
                return
            }
        })
    }

    handleChange = (e) => {
        switch(e.target.className){
            case 'id':
            if(e.target.value.length > 10) break
            this.setState({id: e.target.value})
            break

            case 'pw':
            if(e.target.value.length > 20) break
            this.setState({pw: e.target.value})
            break

            case 'name':
            if(e.target.value.length > 5) break
            this.setState({name: e.target.value})
            break

            case 'email':
            if(e.target.value.length > 40) break
            this.setState({email: e.target.value})
            break

            default:
            break
        }
    }
    handleRegister = () => {
        const {id, pw, name, email} = this.state
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(id === "" || pw ===""||name===""||email===""){
            toast.error("모든 칸을 채워주세요")
            return
        }
        if(!emailRegex.test(email)) {
            toast.error('이메일을 확인해주세요')
            return
        }
        this.props.registerRequest(id, pw, name, email).then(() => {
            if(this.props.status === 'SUCCESS'){
                toast.success('로그인해주세요!')
                this.props.history.push('/login')
            }else{
                let errorMessage = [
                   "문자, 숫자만 넣어주세요",
                   '존재하는 아이디입니다',
                   '존재하는 이메일입니다'
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