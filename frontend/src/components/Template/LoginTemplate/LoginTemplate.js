import React from 'react';
import './LoginTemplate.css'
import {Header} from 'components'

const LoginTemplate = ({Login, onChange, onLogin, id, pw}) => {
    return (
        <div className='loginTemplate'>
            <Header/>
            <section className='loginT'>
                <Login onChange={onChange} onLogin={onLogin} id={id} pw={pw}/>
            </section>
        </div>
    );
};

export default LoginTemplate;