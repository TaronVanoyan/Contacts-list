import {useDispatch} from 'react-redux';
import React from 'react';

import {LOGOUT} from '../../../actions/types';
import style from './SignOut.module.css';

const SignOut = () => {
    const dispatch = useDispatch();

    return (
        <div className={style.logout}>
            <button onClick={() => dispatch({type: LOGOUT})} className={style.logout__btn}>Logout</button>
        </div>
    );
};

export default SignOut;
