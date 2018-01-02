import React, { Component } from 'react';
import {LoginTemplate, Loginc} from 'components'

class Login extends Component {
    render() {
        return (
            <div>
                <LoginTemplate Login={Loginc}/>
            </div>
        );
    }
}

export default Login;