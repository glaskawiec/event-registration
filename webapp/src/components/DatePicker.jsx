import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import ValidationBadge from '../components/ValidationBadge';

const DatePicker = (props) => (
  <>
    <ReactDatePicker
      onFocus={props.input.onFocus}
      onBlur={props.input.onBlur}
      onChange={props.input.onChange}
      customInput={<Form.Control autocomplete="nope" />}
      selected={props.input.value ? new Date(props.input.value) : null}
    />
    <ValidationBadge
      touched={props.meta.touched}
      error={props.meta.error} />  
  </>
)

DatePicker.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired
};

export default DatePicker;