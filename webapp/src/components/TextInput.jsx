import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import ValidationBadge from './ValidationBadge';

const TextInput = (props) => (
    <>
        <Form.Control {...props.input} />
        <ValidationBadge
            touched={props.meta.touched}
            error={props.meta.error} />
    </>
)

TextInput.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }).isRequired
};

export default TextInput;