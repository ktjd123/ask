import React from 'react';
import './Profile.css'
import copy from 'copy-to-clipboard'
import {Helmet} from 'react-helmet'
import {toast} from 'react-toastify'

import fbLogo from './fbLogo.svg'
import twLogo from './twLogo.svg'

class Profile extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    copyToClipBoard = () => {
        copy(window.location.href)
        toast.success('복사했습니다!')
    }

    shareToFacebook = () => {
        window.open("https://www.facebook.com/sharer/sharer.php?u="+window.location.href)
    }

    render() {
        return (
            <div className='profile'>
            <Helmet>
                <title>ASK :: 김성민</title>
            </Helmet>
                <div className='name'>김성민</div>
                <div className='shareBox'>
                    <div className='link'>{window.location.href}</div>
                    <div className='buttonBox'>
                        <div className='copy' onClick={this.copyToClipBoard}><i className="material-icons">content_copy</i></div>
                        <div className='fb' onClick={this.shareToFacebook}><img src={fbLogo} alt=""/></div>
                        <div className='tw'><img src={twLogo} alt=""/></div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Profile;