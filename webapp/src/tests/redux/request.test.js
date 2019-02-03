import configureMockStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk'
import { fetchMock } from 'fetch-mock'
import requestReducer, { initialState } from '../../redux/reducers/request'
import {
  REQUEST_CREATE_EVENT_PENDING,
  REQUEST_CREATE_EVENT_SUCCESS,
  REQUEST_CREATE_EVENT_FAILURE,
  REQUEST_CREATE_EVENT_RESET,
} from '../../redux/types/request'
import {
  createEvent,
  createEventPending,
  createEventSuccess,
  createEventFailure,
  createEventReset
} from '../../redux/actions/request'

const middlewares = [reduxThunk];
const mockStore = configureMockStore(middlewares);

describe('Request actions', () => {
  it('should create REQUEST_CREATE_EVENT_PENDING action properly', () => {
    const expectedAction = { type: REQUEST_CREATE_EVENT_PENDING }
    expect(createEventPending()).toEqual(expectedAction)
  })

  it('should create REQUEST_CREATE_EVENT_SUCCESS action properly', () => {
    const expectedAction = { type: REQUEST_CREATE_EVENT_SUCCESS }
    expect(createEventSuccess()).toEqual(expectedAction)
  })

  it('should create REQUEST_CREATE_EVENT_FAILURE action properly', () => {
    const expectedAction = { type: REQUEST_CREATE_EVENT_FAILURE }
    expect(createEventFailure()).toEqual(expectedAction)
  })

  it('should create REQUEST_CREATE_EVENT_RESET action properly', () => {
    const expectedAction = { type: REQUEST_CREATE_EVENT_RESET }
    expect(createEventReset()).toEqual(expectedAction)
  })
})

describe('Request async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates REQUEST_CREATE_EVENT_SUCCESS when fetching createEvent has been done', () => {
    const store = mockStore({})
    const expectedActions = [
      { type: REQUEST_CREATE_EVENT_PENDING },
      { type: REQUEST_CREATE_EVENT_SUCCESS }
    ]
    const event = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      date: '2/2/2019'
    }

    fetchMock.post('*', 200);

    return store.dispatch(createEvent(event))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates REQUEST_CREATE_EVENT_SUCCESS when fetching createEvent has been failed', () => {
    const store = mockStore({})
    const expectedActions = [
      { type: REQUEST_CREATE_EVENT_PENDING },
      { type: REQUEST_CREATE_EVENT_FAILURE }
    ]
    const event = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      date: '2/2/2019'
    }

    fetchMock.post('*', 500);

    return store.dispatch(createEvent(event))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})

describe('Request reducer', () => {
  it('should return the initial state', () => {
    expect(requestReducer(undefined, {}))
      .toEqual(initialState)
  })

  it('should handle REQUEST_CREATE_EVENT_PENDING properly', () => {
    const actionToHandle = { type: REQUEST_CREATE_EVENT_PENDING }
    expect(requestReducer(initialState, actionToHandle))
      .toEqual({
        ...initialState,
        createEvent: {
          ...initialState.createEvent,
          isPending: true
        }
      })
  })

  it('should handle REQUEST_CREATE_EVENT_SUCCESS properly', () => {
    const actionToHandle = { type: REQUEST_CREATE_EVENT_SUCCESS }
    expect(requestReducer(initialState, actionToHandle))
      .toEqual({
        ...initialState,
        createEvent: {
          ...initialState.createEvent,
          isPending: false,
          isSucceeded: true
        }
      })
  })

  it('should handle REQUEST_CREATE_EVENT_FAILURE properly', () => {
    const actionToHandle = { type: REQUEST_CREATE_EVENT_FAILURE }
    expect(requestReducer(initialState, actionToHandle))
      .toEqual({
        ...initialState,
        createEvent: {
          ...initialState.createEvent,
          isPending: false,
          hadError: true
        }
      })
  })

  it('should handle REQUEST_CREATE_EVENT_RESET properly', () => {
    const actionToHandle = { type: REQUEST_CREATE_EVENT_RESET }
    expect(requestReducer(initialState, actionToHandle))
      .toEqual(initialState)
  })
})