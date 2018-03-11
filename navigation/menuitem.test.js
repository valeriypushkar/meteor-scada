import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import NavMenuItem from './menuitem'

describe('navigation.menuitem', function() {
  const saveConsoleWarn = console.warn;
  const saveConsoleError = console.error;

  const testData1 = {
    name: 'itemname',
    icon: 'itemicon',
    title: 'itemtitle',
    component: () => null,
    componentProps: {someprop: 'value'}
  };

  const testData2 = {
    name: 'itemname2',
    icon: 'itemicon2',
    title: 'itemtitle2',
    component: () => null,
    componentProps: {someprop: 'value2'}
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
    let testData;
    const addItem = (data) => {
      expect(data.name).to.equal(testData.name);
      expect(data.children).to.be.empty;
      expect(data.type).to.equal('NavMenuItem');
      expect(data.childType).to.be.null;
      expect(data.icon).to.equal(testData.icon);
      expect(data.title).to.equal(testData.title);
      expect(data.component).to.equal(testData.component);
      expect(data.componentProps).to.equal(testData.componentProps);
    };

    testData = testData1;
    const wrapper = shallow(<NavMenuItem {...testData} addItem={addItem} />);

    testData = testData2;
    wrapper.setProps({...testData});

    wrapper.unmount();
  });

  it('empty render without children', function() {
    const wrapper = shallow(<NavMenuItem {...testData1} />);
    expect(wrapper.isEmptyRender()).to.equal(true);
    wrapper.unmount();
  });

  it('require name prop', function() {
    expect(() => (
      <NavMenuItem title="title" />
    )).to.throw();
  });

  it('default title value', function() {
    const addItem = (data) => {
      expect(data.name).to.equal("itemname");
      expect(data.title).to.equal("itemname");
    };

    const wrapper = shallow(<NavMenuItem name="itemname" addItem={addItem} />);
    wrapper.unmount();
  });

});
