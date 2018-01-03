import React, { Component } from 'react';
import {MainTemplate, Ask, Menu, Profile, CardList} from 'components'
import {getStatusRequest} from 'actions/authentication'
import {getInfoRequest} from 'actions/info'
import {getPostRequest, postQuestionRequest} from 'actions/post'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'

class Main extends Component {

    state = {
        name: '',
        isMine: false,
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
        this.fetchPosts()
        if(this.props.match.params.id === this.props.mainStatus.currentUser){
            this.setState({
                isMine: true
            })
        }
    }

    fetchPosts = () => {
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

    handlePostQuestion = () => {
        const {input} = this.state
        const replier = this.props.match.params.id
        this.props.postQuestionRequest(replier, input).then(() => {
            if(this.props.questionStatus.status === "SUCCESS"){
                this.setState({
                    input: ''
                })
                toast.success('질문 했습니다!')
                this.fetchPosts()
            }else{
                toast.error(this.props.questionStatus.error)
            }
        })
    }

    render() {
        let {input, count, awI, awICount, selected, name, posts, nPosts, isMine} = this.state
        if(selected !== 'ask'){
            posts = nPosts
        }
        const {
            handleChange,
            handleToggle,
            handlePostQuestion
        } = this

        return (
            <div>
                <MainTemplate
                Profile={Profile}
                isMine={isMine}
                name={name}
                Ask={Ask}
                onQuestion = {handlePostQuestion}
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
        postStatus: state.post.list,
        questionStatus: state.post.postQuestion
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
        },
        postQuestionRequest: (replier, question) => {
            return dispatch(postQuestionRequest(replier, question))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);