import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { publishNavigation } from './store'
import NavigationConsumer from './consumer'

describe('navigation.consumer', function() {
  let current = {};
  const data1 = { data1: 1 };
  const data2 = { data2: 2 };
  TestChildComponent = () => null;

  beforeEach(function() {
    current = {};
    publishNavigation(current);
  });

  it('subscribe to navigation data', function() {
    publishNavigation(data1);

    const wrapper = shallow(<NavigationConsumer />);
    expect(wrapper.state('navigation')).to.equal(data1);

    publishNavigation(data2);
    expect(wrapper.state('navigation')).to.equal(data2);
    wrapper.unmount();
  });

  it('unsibsribe correctly', function() {
    const wrapper = shallow(<NavigationConsumer />);
    wrapper.unmount();
    publishNavigation(data1);
  });

  it('empty render without children', function() {
    const wrapper = shallow(<NavigationConsumer />);
    expect(wrapper.isEmptyRender()).to.equal(true);
    wrapper.unmount();
  });

  it('propogates navigation to child props', function() {
    publishNavigation(data1);

    const wrapper = shallow(
      <NavigationConsumer>
        <TestChildComponent />
        <TestChildComponent />
        <TestChildComponent />
      </NavigationConsumer>
    );

    expect(wrapper.find(TestChildComponent)).to.have.length(3);
    wrapper.find(TestChildComponent).forEach(node => {
      expect(node.props().navigation).to.be.equal(data1);
    });

    publishNavigation(data2);
    wrapper.update(); // required for shallow, since we call setstate async

    expect(wrapper.find(TestChildComponent)).to.have.length(3);
    wrapper.find(TestChildComponent).forEach(node => {
      expect(node.props().navigation).to.be.equal(data2);
    });
  });
});
