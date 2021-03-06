import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { eventLogout } from "./events";

// Async action
export const startLogin = (email, password) => {
    // este dispatch es gracias al thunk
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const { uid, name } = body;
            dispatch( login({ uid, name }) );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const { uid, name } = body;
            dispatch( login({ uid, name }) );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const { uid, name } = body;
            dispatch( login({ uid, name }) );
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

// Sync action
const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout });
