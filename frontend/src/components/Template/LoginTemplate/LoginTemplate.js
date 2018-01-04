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
            <section className='des'>
                로그인을 하고 친구들에게 익명 질문, 응원을 받아보세요!
            </section>
        </div>
    );
};

export default LoginTemplate;