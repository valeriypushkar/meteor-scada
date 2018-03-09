import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import NavMenuItem from './menuitem'

describe('navigation.menuitem', function() {
  const saveConsoleWarn = console.warn;
  const saveConsoleError = console.error;

  const testData = {
    name: 'itemname',
    icon: 'itemicon',
    title: 'itemtitle',
    component: () => null,
    componentProps: {someprop: 'value'}
  };

  before(function() {
    // Change console warn and error to catch PropTypes errors
    console.warn = () => {throw new Error('console.warn converted to throw')};
    console.error = () => {throw new Error('console.error converted to throw')};
  });

  after(function() {
    console.warn = saveConsoleWarn;
    console.error = saveConsoleError;
  });

  it('publish menuitem props', function() {
    const addItem = (name, data) => {
      expect(name).to.equal(testData.name);
      expect(data.children).to.be.empty;
      expect(data.type).to.equal('NavMenuItem');
      expect(data.childType).to.be.null;
      expect(data.icon).to.equal(testData.icon);
      expect(data.title).to.equal(testData.title);
      expect(data.component).to.equal(testData.component);
      expect(data.componentProps).to.equal(testData.componentProps);
    };

    const wrapper = shallow(<NavMenuItem {...testData} addItem={addItem} />);
  });

  it('empty render without children', function() {
    const wrapper = shallow(<NavMenuItem {...testData} />);
    expect(wrapper.isEmptyRender()).to.equal(true);
  });

  it('require name prop', function() {
    expect(() => (
      <NavMenuItem title="title" />
    )).to.throw();
  });

  it('default title value', function() {
    const addItem = (name, data) => {
      expect(name).to.equal("itemname");
      expect(data.title).to.equal("itemname");
    };

    const wrapper = shallow(<NavMenuItem name="itemname" addItem={addItem} />);
  });

});
