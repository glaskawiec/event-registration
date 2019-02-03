import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const ValidationBadge = props => (
    (props.touched &&
    props.error &&
    <Badge variant="danger">
        {props.error}
    </Badge>) || null
)

ValidationBadge.propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.string,
};

export default ValidationBadge;