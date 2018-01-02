import React from 'react';
import './LoginTemplate.css'
import {Header} from 'components'

const LoginTemplate = ({Login}) => {
    return (
        <div className='loginTemplate'>
            <Header/>
            <section className='loginT'>
                <Login/>
            </section>
        </div>
    );
};

export default LoginTemplate;