
import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiAsPromised from 'chai-as-promised';
import { RegisterEventForm } from '../../components/RegisterEventForm';
import { Alert, Button } from 'react-bootstrap';

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('Register Event Form Unit Tests', () => {
  it('should render error altert when form sumbit failed', () => {
    const props = {
      hadError: true,
      isPending: false,
      handleSubmit: jest.fn(),
      dispatch: jest.fn()
    }
    const wrapper = shallow(<RegisterEventForm {...props} />);
    const alert = wrapper.find(Alert);

    expect(alert).to.have.lengthOf(1);
    expect(alert.text()).to.equal('There was an error, please try again later.');
  });

  it('should not render error altert when form submit is not failed', () => {
    const props = {
      hadError: false,
      isPending: false,
      handleSubmit: jest.fn(),
      dispatch: jest.fn()
    }
    const wrapper = shallow(<RegisterEventForm {...props} />);
    const alert = wrapper.find(Alert);

    expect(alert).to.have.lengthOf(0);
  });

  it('should call handleSubmit fcn after Register button click', () => {
    const props = {
      hadError: false,
      isPending: false,
      handleSubmit: jest.fn(),
      dispatch: jest.fn()
    }
    const wrapper = shallow(<RegisterEventForm {...props} />);
    const button = wrapper.find(Button);

    button.simulate('click');

    expect(button.text()).to.equal('Register');
    expect(props.handleSubmit.mock.calls.length).to.equal(1)
  });

  it('should form button be disabled and text should be Loading… while form is submitting', () => {
    const props = {
      hadError: false,
      isPending: true,
      handleSubmit: jest.fn(),
      dispatch: jest.fn()
    }
    const wrapper = shallow(<RegisterEventForm {...props} />);
    const button = wrapper.find(Button);

    expect(button.text()).to.equal('Loading…');
    expect(button.props().disabled).to.equal(true);
  });
});