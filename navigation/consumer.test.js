import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { publishNavigation } from './store'
import withNavigation from './consumer'

describe('navigation.consumer', function() {
  let current = {};
  const data1 = { data1: 1 };
  const data2 = { data2: 2 };
  TestComponent = () => null;
  WrappedComponent = withNavigation(TestComponent);

  beforeEach(function() {
    current = {};
    publishNavigation(current);
  });

  it('subscribe to navigation data', function() {
    publishNavigation(data1);

    const wrapper = shallow(<WrappedComponent />);
    expect(wrapper.state('navigation')).to.equal(data1);

    publishNavigation(data2);
    expect(wrapper.state('navigation')).to.equal(data2);
    wrapper.unmount();
  });

  it('unsibsribe correctly', function() {
    const wrapper = shallow(<WrappedComponent />);
    wrapper.unmount();
    publishNavigation(data1);
  });

  it('propogates navigation to child props', function() {
    publishNavigation(data1);

    const wrapper = shallow(<WrappedComponent />);

    expect(wrapper.find(TestComponent)).to.have.length(1);
    expect(wrapper.find(TestComponent).props().navigation).to.be.equal(data1);

    publishNavigation(data2);
    wrapper.update(); // required for shallow, since we call setstate async

    expect(wrapper.find(TestComponent)).to.have.length(1);
    expect(wrapper.find(TestComponent).props().navigation).to.be.equal(data2);
  });
});
