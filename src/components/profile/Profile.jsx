import {useHistory, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';

import {EDIT_CONTACT} from '../../actions/types';
import style from './Profile.module.css';

const Profile = () => {
    const history = useHistory();
    const location = useLocation().state;
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts);
    const [selectedContact, setSelectedContact] = useState([]);

    useEffect(() => {
        const contact = contacts.find((contact) => contact.id === location.id);
        setSelectedContact(contact);
    }, [contacts, location.id]);

    const changeValue = (event) => {
        selectedContact[event.target.name] = event.target.value;
    };

    const updateContact = () => {
        dispatch({
            type: EDIT_CONTACT,
            contact: selectedContact
        });

        history.push('/dashboard');
    };

    return (
        <div className={style.profile}>
            <h1 className={style.profile__edit_title}>Edit Profile</h1>

            <ul className={style.profile__edit}>
                <li className={style.profile__edit_row}>
                    <label htmlFor="">ID</label>
                    <input type="text" readOnly={true} disabled={true} defaultValue={selectedContact.id}/>
                </li>
                <li className={style.profile__edit_row}>
                    <label htmlFor="name">Member Name</label>
                    <input type="text" id='name' name="name" defaultValue={selectedContact.name} onChange={(event) => changeValue(event)}/>
                </li>
                <li className={style.profile__edit_row}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' name='username' defaultValue={selectedContact.username} onChange={(event) => changeValue(event)}/>
                </li>
                <li className={style.profile__edit_row}>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" id='mobile' name='phone' defaultValue={selectedContact.phone} onChange={(event) => changeValue(event)}/>
                </li>
                <li className={style.profile__edit_row}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' defaultValue={selectedContact.email} onChange={(event) => changeValue(event)}/>
                </li>
                <li className={style.profile__edit_row}>
                    <label htmlFor="website">Website</label>
                    <input type="text" id='website' name='website' defaultValue={selectedContact.website} onChange={(event) => changeValue(event)}/>
                </li>
                <li className={style.profile__edit_row}>
                    <button className={style.save__changes} onClick={() => {
                        updateContact()
                    }}>Save
                    </button>
                </li>
            </ul>
        </div>
    )
};

export default Profile;
