import {
    REQUEST_CREATE_EVENT_PENDING,
    REQUEST_CREATE_EVENT_SUCCESS,
    REQUEST_CREATE_EVENT_FAILURE,
    REQUEST_CREATE_EVENT_RESET
} from '../types/request'

export const initialState = {
    createEvent: {
        isPending: false,
        hadError: false,
        isSucceeded: false,
    }
}

const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CREATE_EVENT_PENDING:
            return {
                ...state,
                createEvent: {
                    ...state.createEvent,
                    isPending: true
                }
            }
        case REQUEST_CREATE_EVENT_SUCCESS:
            return {
                ...state,
                createEvent: {
                    ...state.createEvent,
                    isSucceeded: true,
                    isPending: false
                }
            }
        case REQUEST_CREATE_EVENT_FAILURE:
            return {
                ...state,
                createEvent: {
                    ...state.createEvent,
                    isPending: false,
                    hadError: true
                }
            }
        case REQUEST_CREATE_EVENT_RESET:
            return { ...initialState }
        default:
            return state
    }
}

export default requestReducer;