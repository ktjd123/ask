import React from 'react';
import {Header} from 'components'
import './RegisterTemplate.css'

const RegisterTemplate = ({Register}) => {
    return (
        <div className='registerTemplate'>
            <Header/>
            <section className='registerT'>
                <Register/>
            </section>
        </div>
    );
};

export default RegisterTemplate;