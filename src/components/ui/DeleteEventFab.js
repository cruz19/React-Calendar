import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDeleted } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleClickDelete = () => {
        dispatch( eventStartDeleted() );
    }

    return (
        <button
            onClick={ handleClickDelete }
            className="btn btn-danger fab-danger"
        >
            <i className="fa fa-trash" aria-hidden="true"></i>
            <span> Borrar evento</span>
        </button>
    )
}
