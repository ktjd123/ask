import React, { Component } from 'react';
import {MainTemplate, Ask, Menu, Profile, CardList} from 'components'
import {getStatusRequest} from 'actions/authentication'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'

class Main extends Component {

    state = {
        input: '',
        count: 0,
        selected: 'ask'
    }

    componentDidMount() {
        this.props.getStatusRequest().then(() => {
            if(this.props.mainStatus.valid){
                return
            }else{
                toast.error('로그인을 한 후에 질문, 확인할 수 있습니다.')
                this.props.history.push('/login')
            }
        })
    }
    

    handleChange = (e) => {
        let count = e.target.value.length
        this.setState({
            input: e.target.value,
            count: count
        })
    }

    handleToggle = (ask) => {
        this.setState({
            selected: ask
        })
    }

    render() {
        const {input, count, selected} = this.state
        const {
            handleChange,
            handleToggle
        } = this

        return (
            <div>
                <MainTemplate 
                Profile={Profile}
                Ask={Ask}
                Menu={Menu} 
                value={input} 
                onChange={handleChange} 
                count={count}
                onToggle={handleToggle}
                selected={selected}
                CardList={CardList}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mainStatus: state.authentication.status
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getStatusRequest: () => {
            return dispatch(getStatusRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);