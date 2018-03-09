import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { subscribeNavigation, unsubscribeNavigation } from './store'
import NavigationProvider from './provider'
import NavMenuItem from './menuitem'

describe('navigation.provider', function() {
  const saveConsoleWarn = console.warn;
  const saveConsoleError = console.error;

  before(function() {
    // Change console warn and error to catch PropTypes errors
    console.warn = () => {throw new Error('console.warn converted to throw')};
    console.error = () => {throw new Error('console.error converted to throw')};
  });

  after(function() {
    console.warn = saveConsoleWarn;
    console.error = saveConsoleError;
  });

  it('publish on mount and update', function() {
    let count = 0;
    const id = subscribeNavigation(data => count++);

    expect(count).to.equal(1);
    const wrapper = shallow(<NavigationProvider />);
    expect(count).to.equal(2);
    wrapper.setProps({});
    expect(count).to.equal(3);

    unsubscribeNavigation(id);
  });

  it('publish new data each time', function() {
    let current = {};
    const id = subscribeNavigation(data => {
      expect(current).to.not.equal(data);
      current = data;
    });

    const wrapper = shallow(<NavigationProvider />);
    wrapper.setProps({});
    wrapper.setProps({});

    unsubscribeNavigation(id);
  });

  it('handle NavMenuItem children', function() {
    const wrapper = shallow(
      <NavigationProvider>
        <NavMenuItem name="name1" />
        <NavMenuItem name="name2" />
        <NavMenuItem name="name3" />
      </NavigationProvider>
    );

    expect(wrapper.find(NavMenuItem)).to.have.length(3);

    wrapper.find(NavMenuItem).forEach(node => {
      expect(node.props().addItem).to.be.a('function');
    });
  });

  it('handle wrong child element type', function() {
    expect(() => (
      <NavigationProvider>
        <div />
      </NavigationProvider>
    )).to.throw();
  });

  it('handle non-unique names of child elements', function() {
    expect(() => (
      <NavigationProvider>
        <NavMenuItem name="name1" />
        <NavMenuItem name="name2" />
        <NavMenuItem name="name1" />
      </NavigationProvider>
    )).to.throw();
  });
});
