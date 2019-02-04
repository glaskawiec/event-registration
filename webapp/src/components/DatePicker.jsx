import React from 'react';
import PropTypes from 'prop-types';
import ValidationBadge from '../components/ValidationBadge';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'

const DatePicker = (props) => (
  <>
    <DateTimePicker
      onChange={props.input.onChange}
      onFocus={props.input.onFocus}
      onBlur={props.input.onBlur}
      format="DD MMM YYYY"
      time={false}
      value={!props.input.value ? null : new Date(props.input.value)}
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