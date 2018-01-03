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
        awI: '',
        awICount: 0,
        selected: 'ask',
        posts: [],
        nPosts: []
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
                this.props.history.push('/')
            }
        })
    }
    componentDidMount() {
        const id = this.props.match.params.id
        this.props.getPostRequest(id, true).then(() => {
            if(this.props.postStatus.status === "SUCCESS"){
                this.setState({
                    posts: this.props.postStatus.data
                })
            }
        })

        this.props.getPostRequest(id, false).then(() => {
            if(this.props.postStatus.status === "SUCCESS"){
                this.setState({
                    nPosts: this.props.postStatus.nData
                })
            }
        })
    }
    
    

    handleChange = (e) => {
        let count = e.target.value.length
        if(count > 300){
            return
        }
        if(e.target.className==='awI'){
            this.setState({
                awI: e.target.value,
                awICount: count
            })
        }else{
            this.setState({
                input: e.target.value,
                count: count
            })
        }
    }

    handleToggle = (ask) => {
        this.setState({
            selected: ask
        })
    }

    render() {
        let {input, count, awI, awICount, selected, name, posts, nPosts} = this.state
        if(selected !== 'ask'){
            posts = nPosts
        }
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
                awI = {awI}
                awICount={awICount}
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
        getPostRequest: (id, aw) => {
            return dispatch(getPostRequest(id, aw))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);