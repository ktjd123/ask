import React, { Component } from 'react';
import {RegisterTemplate, Registerc} from 'components'

class Register extends Component {
    render() {
        return (
            <div>
                <RegisterTemplate Register={Registerc}/>
            </div>
        );
    }
}

export default Register;