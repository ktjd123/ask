import React, { Component } from 'react';
import {MainTemplate, Ask, Menu, Profile, CardList} from 'components'
import {getStatusRequest} from 'actions/authentication'
import {getInfoRequest} from 'actions/info'
import {getPostRequest} from 'actions/post'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'

class Main extends Component {

    state = {
        name: '',
        input: '',
        count: 0,
        selected: 'ask',
        posts: []
    }

    componentWillMount() {
        this.props.getStatusRequest().then(() => {
            if(this.props.mainStatus.valid){
                return
            }else{
                toast.error('로그인을 한 후에 질문, 답변을 확인할 수 있습니다.')
                this.props.history.push('/login')
            }
        })
        const id = this.props.match.params.id
        this.props.getInfoRequest(id).then(() => {
            if(this.props.infoStatus.status === "SUCCESS"){
                this.setState({
                    name: this.props.infoStatus.name
                })
            }else{
                toast.error('없는 사용자입니다')
                this.props.history.push('/'+this.props.mainStatus.currentUser)
            }
        })
        this.props.getPostRequest(id).then(() => {
            if(this.props.postStatus.status === "SUCCESS"){
                console.log(this.props.postStatus.data)
                this.setState({
                    posts: this.props.postStatus.data
                })
            }else{
                toast.error('다시 시도해주세요')
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
        const {input, count, selected, name, posts} = this.state
        const {
            handleChange,
            handleToggle
        } = this

        return (
            <div>
                <MainTemplate
                Profile={Profile}
                name={name}
                Ask={Ask}
                Menu={Menu} 
                value={input} 
                onChange={handleChange} 
                count={count}
                onToggle={handleToggle}
                selected={selected}
                posts={posts}
                CardList={CardList}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mainStatus: state.authentication.status,
        infoStatus: state.authentication.info,
        postStatus: state.post.list
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getStatusRequest: () => {
            return dispatch(getStatusRequest())
        },
        getInfoRequest: (id) => {
            return dispatch(getInfoRequest(id))
        },
        getPostRequest: (id) => {
            return dispatch(getPostRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);