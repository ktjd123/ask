import React, { Component } from 'react';
import {MainTemplate, Ask, Menu, Profile, CardList} from 'components'
import {getStatusRequest} from 'actions/authentication'
import {getInfoRequest} from 'actions/info'
import {getPostRequest, postQuestionRequest, postAnswerRequest} from 'actions/post'
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
                if(this.props.match.params.id === this.props.mainStatus.currentUser){
                    this.setState({
                        isMine: true
                    })
                }
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
        if(input.length < 1){
            toast.error('내용을 입력해주세요')
            return
        }
        this.props.postQuestionRequest(replier, input).then(() => {
            if(this.props.questionStatus.status === "SUCCESS"){
                this.setState({
                    input: ''
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
        }
        this.props.postAnswerRequest(id, awI).then(() => {
            if(this.props.answerStatus.status === "SUCCESS"){
                this.setState({
                    awI: ''
                })
                toast.success('답변 했습니다!')
                this.fetchPosts()
            }else{
                toast.error(this.props.answerStatus.error)
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
            handlePostQuestion,
            handlePostAnswer
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
        answerStatus: state.post.postAnswer
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
        },
        postAnswerRequest: (id, answer) => {
            return dispatch(postAnswerRequest(id, answer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);