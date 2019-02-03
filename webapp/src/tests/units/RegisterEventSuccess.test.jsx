import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai'
import { RegisterEventSuccess } from '../../components/RegisterEventSuccess';
import { Button } from 'react-bootstrap';

describe('Register Event Success Unit Tests', () => {
    it('should call createEventReset action after Register another button click', () => {
        const props = {
            createEventReset: jest.fn()
        }
        const wrapper = shallow(<RegisterEventSuccess {...props} />)
        const button = wrapper.find(Button);

        button.simulate('click');
        
        expect(button.text()).to.equal('Register another');
        expect(props.createEventReset.mock.calls.length).to.equal(1)
    });
});