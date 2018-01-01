import React from 'react';
import './Profile.css'

class Profile extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }
    
    render(){
        return (
            <div className='profile'>
                <div className='name'>김성민</div>
                
            </div>
        );
    }
};

export default Profile;