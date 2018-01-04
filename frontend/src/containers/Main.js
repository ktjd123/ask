import React, { Component } from 'react';
import {MainTemplate, Ask, Menu, Profile, CardList} from 'components'
import {getStatusRequest} from 'actions/authentication'
import {getInfoRequest} from 'actions/info'
import {
    getPostRequest, 
    postQuestionRequest, 
    postAnswerRequest, 
    postRemoveRequest
} from 'actions/post'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'

class Main extends Component {

    state = {
        name: '',
        isMine: false,
        loggedIn: false,
        input: '',
        count: 0,
        awI: '',
        awICount: 0,
        selected: 'ask',
        posts: [],
        nPosts: [],
        postCount: 0,
        nPostCount: 0
    }

    componentWillMount() {
        this.props.getStatusRequest().then(() => {
            if(this.props.mainStatus.valid){
                this.setState({
                    loggedIn: true
                })
                if(this.props.match.params.id === this.props.mainStatus.currentUser){
                    this.setState({
                        isMine: true
                    })
                }
                return
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
    }

    fetchPosts = () => {
        const id = this.props.match.params.id
        this.props.getPostRequest(id, true).then(() => {
            if(this.props.postStatus.status === "SUCCESS"){
                this.setState({
                    posts: this.props.postStatus.data,
                    postCount: this.props.postStatus.data.length
                })
            }
        })

        this.props.getPostRequest(id, false).then(() => {
            if(this.props.postStatus.status === "SUCCESS"){
                this.setState({
                    nPosts: this.props.postStatus.nData,
                    nPostCount: this.props.postStatus.nData.length
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
        const {input, loggedIn} = this.state
        const replier = this.props.match.params.id
        if(input.length < 1){
            toast.error('내용을 입력해주세요')
            return
        }
        this.props.postQuestionRequest(replier, input, loggedIn).then(() => {
            if(this.props.questionStatus.status === "SUCCESS"){
                this.setState({
                    input: '',
                    count: 0
                })
                toast.success('질문 했습니다!')
                this.fetchPosts()
            }
        })
    }

    handlePostAnswer = (id) => {
        const {awI, awICount} = this.state
        if(awICount < 1){
            toast.error('내용을 입력해주세요!')
            return
        }
        this.props.postAnswerRequest(id, awI).then(() => {
            if(this.props.answerStatus.status === "SUCCESS"){
                this.setState({
                    awI: '',
                    awICount: 0
                })
                toast.success('답변 했습니다!')
                this.fetchPosts()
            }else{
                toast.error(this.props.answerStatus.error)
            }
        })
    }

    handleRemove = id => {
        this.props.postRemoveRequest(id).then(() => {
            if(this.props.removeStatus.status === "SUCCESS"){
                toast.success('삭제 했습니다!')
                this.fetchPosts()
            }
        })
    }

    render() {
        let {
            input, 
            count, 
            awI, 
            awICount, 
            selected, 
            name, 
            posts, 
            nPosts, 
            isMine,
            postCount,
            nPostCount
        } = this.state
        if(selected !== 'ask'){
            posts = nPosts
        }
        const {
            handleChange,
            handleToggle,
            handlePostQuestion,
            handlePostAnswer,
            handleRemove
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
                onAnswer = {handlePostAnswer}
                handleRemove={handleRemove}
                postCount={postCount}
                nPostCount={nPostCount}
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
        questionStatus: state.post.postQuestion,
        answerStatus: state.post.postAnswer,
        removeStatus: state.post.postRemove
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
        postQuestionRequest: (replier, question, loggedIn) => {
            return dispatch(postQuestionRequest(replier, question, loggedIn))
        },
        postAnswerRequest: (id, answer) => {
            return dispatch(postAnswerRequest(id, answer))
        },
        postRemoveRequest: (id) => {
            return dispatch(postRemoveRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);