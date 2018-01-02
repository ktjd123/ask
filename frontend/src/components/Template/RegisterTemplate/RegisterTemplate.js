import React from 'react';
import {Header} from 'components'
import './RegisterTemplate.css'

const RegisterTemplate = ({Register, id, pw, name, email, onChange, onRegister}) => {
    return (
        <div className='registerTemplate'>
            <Header/>
            <section className='registerT'>
                <Register id={id} pw={pw} name={name} email={email} onChange={onChange} onRegister={onRegister} />
            </section>
        </div>
    );
};

export default RegisterTemplate;