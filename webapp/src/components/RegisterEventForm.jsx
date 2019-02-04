import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from './DatePicker';
import TextInput from './TextInput';
import { email, required } from '../utils/validations';
import { connect } from 'react-redux';
import { createEvent } from '../redux/actions/request';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
export class RegisterEventForm extends React.Component {
  constructor(props) {
    super(props);
    Moment.locale('en');
    momentLocalizer();
  }

  onSubmit = (formData) => {
    const { dispatch } = this.props;
    dispatch(createEvent(formData));
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {
          [
            {
              id: 'firstName',
              label: 'First Name',
              component: TextInput,
              validate: required
            },
            {
              id: 'lastName',
              label: 'Last Name',
              component: TextInput,
              validate: required
            },
            {
              id: 'email',
              label: 'Email',
              component: TextInput,
              validate: [required, email]
            },
            {
              id: 'date',
              label: 'Date',
              component: DatePicker,
              validate: required
            }
          ].map((field) => (
            <Form.Group key={field.id}>
              <Form.Label>
                {field.label}
              </Form.Label>
              <Field
                name={field.id}
                label={field.label}
                component={field.component}
                validate={field.validate}
              />
            </Form.Group>
          ))}
        {
          this.props.hadError &&
          <Alert variant="danger">
            There was an error, please try again later.
          </Alert>
        }
        <Button
          type="submit"
          disabled={this.props.isPending} >
          {this.props.isPending ? 'Loading…' : 'Register'}
        </Button>
      </Form>
    )
  }
}

RegisterEventForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
  hadError: PropTypes.bool,
}

const ConnectedRegisterEventForm = connect(
  (state) => ({
    hadError: state.request.createEvent.hadError,
    isPending: state.request.createEvent.isPending,
  }),
  () => ({}),
)(RegisterEventForm)

export default reduxForm({
  form: 'createEvent',
})(ConnectedRegisterEventForm);
