import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store' //ES6 modules
import App from '../../components/App';
import { initialState as requestInitialState } from '../../redux/reducers/request';

const middlewares = []
const mockStore = configureStore(middlewares);

test('App snapshot', () => {
    const initialState = {
        request: requestInitialState
    }
    const store = mockStore(initialState)
    const tree = renderer
        .create(
            <Provider store={store}>
                <App />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});