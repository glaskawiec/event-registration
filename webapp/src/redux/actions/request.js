import { apiUri } from '../../config/default.json';

import {
    REQUEST_CREATE_EVENT_PENDING,
    REQUEST_CREATE_EVENT_SUCCESS,
    REQUEST_CREATE_EVENT_FAILURE,
    REQUEST_CREATE_EVENT_RESET
} from '../types/request'

export const createEventPending = () => ({
    type: REQUEST_CREATE_EVENT_PENDING
})

export const createEventSuccess = () => ({
    type: REQUEST_CREATE_EVENT_SUCCESS
})

export const createEventFailure = () => ({
    type: REQUEST_CREATE_EVENT_FAILURE
})

export const createEventReset = () => ({
    type: REQUEST_CREATE_EVENT_RESET
})

export const createEvent = (event) => {
    return dispatch => {
        dispatch(createEventPending());
        return fetch(`${apiUri}/events`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
            .then((response) => {
                if (response.ok) {
                    dispatch(createEventSuccess())
                } else {
                    dispatch(createEventFailure())
                }
            })
            .catch(() => { dispatch(createEventFailure()) });
    }
}

