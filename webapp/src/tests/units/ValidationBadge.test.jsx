import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai'
import { Badge } from 'react-bootstrap';
import ValidationBadge from '../../components/ValidationBadge';

describe('Validation Badge Unit Tests', () => {
    it('should render error badge when input was touched and have error', () => {
        const props = {
            touched: true,
            error: 'Required'
        }
        const wrapper = shallow(<ValidationBadge {...props} />)
        const badge = wrapper.find(Badge);

        expect(badge).to.have.lengthOf(1);
        expect(badge.text()).to.equal('Required');
    });

    it('should not render error badge when input was touched and do not have error', () => {
        const props = {
            touched: true,
            error: ''
        }
        const wrapper = shallow(<ValidationBadge {...props} />)
        const badge = wrapper.find(Badge);

        expect(badge).to.have.lengthOf(0);
    });

    it('should not render error badge when input was not touched and do not have error', () => {
        const props = {
            touched: false,
            error: ''
        }
        const wrapper = shallow(<ValidationBadge {...props} />)
        const badge = wrapper.find(Badge);

        expect(badge).to.have.lengthOf(0);
    });

    it('should not render error badge when input was not touched and have error', () => {
        const props = {
            touched: false,
            error: 'Required'
        }
        const wrapper = shallow(<ValidationBadge {...props} />)
        const badge = wrapper.find(Badge);

        expect(badge).to.have.lengthOf(0);
    });
});