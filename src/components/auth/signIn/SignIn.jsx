import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import React from 'react';

import {LOGIN} from '../../../actions/types';
import style from './SignIn.module.css';

const SignIn = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const login = () => {
        dispatch({type: LOGIN});
        history.push('/dashboard');
    };

    return (
        <div className={style.login}>
            <h1 className={style.login__title}>The form of your dreams</h1>

            <form className={style.login__form}>
                <div className={style.login__form_row}>
                    <label htmlFor="login">Login</label>
                    <input type="text" placeholder='Type something' className={style.login__fld} name="login"
                           autoComplete="username" id="login"/>
                </div>
                <div className={style.login__form_row}>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Type something' className={style.password_fld}
                           autoComplete="current-password" name="pass"
                           id="password"/>
                </div>
                <div className={`${style.login__form_row} ${style.login__btn_row}`}>
                    <input type="button" value="Login" className={style.login__btn} onClick={() => login()}/>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
