import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Layout from './Layout';
import RegisterEventForm from './RegisterEventForm';
import RegisterEventSuccess from './RegisterEventSuccess';

export const App = (props) => (
    <Layout>
        {
            props.createEventSuccess ?
                <RegisterEventSuccess /> :
                <RegisterEventForm />
        }
    </Layout>
)

App.propTypes = {
    createEventSuccess: PropTypes.bool.isRequired
}

const ConnectedApp = connect(
    state => ({
        createEventSuccess: state.request.createEvent.isSucceeded
    }),
    () => ({})
)(App)

export default ConnectedApp;