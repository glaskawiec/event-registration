
import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../components/App';
import { expect } from 'chai'
import RegisterEventForm from '../../components/RegisterEventForm';
import RegisterEventSuccess from '../../components/RegisterEventSuccess';

describe('App Unit Tests', () => {
  it('should render register form when register is not succedded', () => {
    const wrapper = shallow(<App createEventSuccess={false} />);

    expect(wrapper.find(RegisterEventForm)).to.have.lengthOf(1);
    expect(wrapper.find(RegisterEventSuccess)).to.have.lengthOf(0);
  });

  it('should render register success when register is succedded', () => {
    const wrapper = shallow(<App createEventSuccess={true} />);

    expect(wrapper.find(RegisterEventSuccess)).to.have.lengthOf(1);
    expect(wrapper.find(RegisterEventForm)).to.have.lengthOf(0);
  });
});