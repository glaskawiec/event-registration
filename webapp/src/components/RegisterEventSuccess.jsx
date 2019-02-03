import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { createEventReset } from '../redux/actions/request';
import { connect } from 'react-redux';

export const RegisterEventSuccess = (props) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h4>Success</h4>
            <p>The data have been saved in the database.</p>
            <Button onClick={props.createEventReset}>Register another</Button>
        </div>
    );
};

RegisterEventSuccess.propTypes = {
    createEventReset: PropTypes.func.isRequired,
}

const ConnectedRegisterEventSuccess = connect(
    () => ({}),
    dispatch => ({
        createEventReset: () => dispatch(createEventReset())
    })
)(RegisterEventSuccess)

export default ConnectedRegisterEventSuccess;

