import {LOGIN, LOGOUT, GET_CONTACTS, EDIT_CONTACT, DELETE_CONTACT} from '../actions/types';

const initialState = {
    contacts: [],
    isAuthenticated: false
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                isAuthenticated: true,
            }
        }
        case LOGOUT: {
            return {
                contacts: [],
                isAuthenticated: false
            }
        }
        case GET_CONTACTS: {
            return {
                ...state,
                contacts: action.contacts
            }
        }
        case DELETE_CONTACT: {
            const contacts = state.contacts.filter((value) => value.id !== action.contactID);

            return {...state, contacts}
        }
        case EDIT_CONTACT: {
            const contacts = state.contacts.map((contact) => {
               if(contact.id === action.contact.id) {
                   contact = action.contact;
               }

               return contact;
            });

            return {...state, contacts}
        }
        default:
            return state;
    }
}
