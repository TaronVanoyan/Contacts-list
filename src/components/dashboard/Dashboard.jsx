import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {DELETE_CONTACT, GET_CONTACTS} from '../../actions/types';
import style from './Dashboard.module.css'

const Dashboard = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const initialState = useSelector(state => state.contacts);
    const [contacts, setContacts] = useState(initialState);

    useEffect(() => {
        if (!initialState.length) {
            axios.get('http://jsonplaceholder.typicode.com/users')
                .then((res) => {
                    dispatch({
                        type: GET_CONTACTS,
                        contacts: res.data
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            setContacts(initialState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialState]);

    const changeRout = (direction, state) => {
        history.push({
            pathname: direction,
            state
        });
    };

    const findContact = (value) => {
        if (value) {
            const filteredContacts = initialState.filter((contact) => (contact.name.indexOf(value) !== -1));
            setContacts(filteredContacts);
        } else {
            setContacts(initialState);
        }
    };

    const removeContact = (contactID) => {
        dispatch({
            type: DELETE_CONTACT,
            contactID
        })
    };

    return (
        <div className={style.dashboard}>
            {/*Search*/}
            <div className={style.search}>
                <label htmlFor="search" className={style.search__label}>Find contacts by name:</label>
                <input type="text" id='search' className={style.search__fld} onChange={(event) => {
                    findContact(event.target.value);
                }}/>
            </div>

            {/*Table*/}
            <table className={style.contacts__list}>
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Member name</th>
                    <th>Username</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>website</th>
                    <th>Operation</th>
                </tr>
                {
                    contacts.length ? (contacts.map(contact => (
                            <tr key={contact.id}>
                                <td>{contact.id}</td>
                                <td>{contact.name}</td>
                                <td>{contact.username}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.email}</td>
                                <td>{contact.website}</td>
                                <td className={style.contact__actions}>
                                    <button className={style.contact__edit}
                                            onClick={() => changeRout('/profile', {id: contact.id})}/>
                                    <button className={style.contact__delete}
                                            onClick={() => removeContact(contact.id)}/>
                                </td>
                            </tr>
                        )
                    )) : (<tr>
                        <td colSpan='7' className={style.no__contacts}>There are no contacts</td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    )
};

export default Dashboard;
