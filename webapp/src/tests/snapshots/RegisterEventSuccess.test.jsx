import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RegisterEventSuccess from '../../components/RegisterEventSuccess';
import { initialState as requestInitialState } from '../../redux/reducers/request';

const middlewares = []
const mockStore = configureStore(middlewares);

test('RegisterEventSuccess snapshot', () => {
    const initialState = {
        request: requestInitialState
    }
    const store = mockStore(initialState)
    const tree = renderer
        .create(
            <Provider store={store}>
                <RegisterEventSuccess />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});