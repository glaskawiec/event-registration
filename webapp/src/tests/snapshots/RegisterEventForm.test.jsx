import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import RegisterEventForm from '../../components/RegisterEventForm';
import { initialState as requestInitialState } from '../../redux/reducers/request';

const middlewares = []
const mockStore = configureStore(middlewares);
test('RegisterEventForm snapshot', () => {
    const initialState = {
        request: requestInitialState
    }
    const store = mockStore(initialState)
    const tree = renderer
        .create(
            <Provider store={store}>
                <RegisterEventForm />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});