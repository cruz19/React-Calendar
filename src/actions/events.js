import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";

export const eventStartAddNew = (event) => {
    // dispatch, useSelector
    return async (dispatch, getState) => {
        const { uid:_id, name } = getState().auth;

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            if (body.ok) {
                const { id } = body.evento;
                event.id = id;
                event.user = { _id, name };

                dispatch( eventAddNew(event) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch(err) {
            console.log(err);
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try{
            const resp = await fetchConToken(`events/${ event.id }`, event, 'PUT');
            const body = await resp.json();
            if (body.ok) {
                dispatch( eventUpdated(event) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        }catch(err) {
            console.log(err);
        }
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDeleted = () => {
    return async (dispatch, getState) => {
        const { activeEvent: { id } } = getState().calendar;
        try{
            const resp = await fetchConToken(`events/${ id }`, {}, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        }catch(err) {
            console.log(err);
        }
    }
}

const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();
            const events = prepareEvents( body.eventos );
            dispatch( eventLoaded(events) );
        } catch(err) {
            console.log(err);
        }
    }
};

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventLogout = () => ({ type: types.eventLogout });