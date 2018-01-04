import React, { Component } from 'react';
import {connect} from 'react-redux'
import {adminGetRequest} from 'actions/admin'

class Admin extends Component {

    state = {
        accounts: 0,
        posts: 0
    }

    componentDidMount() {
        this.props.adminGetRequest().then(() => {
            if(this.props.adminStatus.status === "SUCCESS"){
                this.setState({
                    accounts: this.props.adminStatus.accounts,
                    posts: this.props.adminStatus.posts
                })
            }else{
                this.props.history.push('/')
            }
        })
    }
    
    render() {
        const {accounts, posts} = this.state
        return (
            <div style={{width: 100+'vw', height: 100+'vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>posts</div>
                    <div>{posts}</div>
                </div>
                <div style={{marginTop: 10+'px', display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
                    <div>accounts</div>
                    <div>{accounts}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        adminStatus: state.admin.adminStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        adminGetRequest: () => {
            return dispatch(adminGetRequest())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);