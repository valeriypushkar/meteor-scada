import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import NavTabItem from './tabitem'

describe('navigation.tabitem', function() {
  const saveConsoleWarn = console.warn;
  const saveConsoleError = console.error;

  const testData1 = {
    name: 'itemname',
    title: 'itemtitle',
    component: () => null,
  };

  const testData2 = {
    name: 'itemname2',
    title: 'itemtitle2',
    component: () => null,
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

  it('publish tabitem props', function() {
    let testData;
    const addItem = (data) => {
      expect(data.name).to.equal(testData.name);
      expect(data.type).to.equal('tabitem');
      expect(data.title).to.equal(testData.title);
      expect(data.component).to.equal(testData.component);
      expect(data.children).to.be.undefined;
    };

    testData = testData1;
    const wrapper = shallow(<NavTabItem {...testData} addItem={addItem} />);

    testData = testData2;
    wrapper.setProps({...testData});

    wrapper.unmount();
  });

  it('empty render', function() {
    const wrapper = shallow(<NavTabItem {...testData1} />);
    expect(wrapper.isEmptyRender()).to.equal(true);
    wrapper.unmount();
  });

  it('require name prop', function() {
    expect(() => (
      <NavTabItem title="title" />
    )).to.throw();
  });

  it('default title value', function() {
    const addItem = (data) => {
      expect(data.name).to.equal("itemname");
      expect(data.title).to.equal("itemname");
    };

    const wrapper = shallow(<NavTabItem name="itemname" addItem={addItem} />);
    wrapper.unmount();
  });

});
