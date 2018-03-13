import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import NavTabItem from './tabitem'
import NavSubMenuItem from './submenuitem'

describe('navigation.submenuitem', function() {
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
    console.warn = (text) => {throw new Error(text)};
    console.error = (text) => {throw new Error(text)};
  });

  after(function() {
    console.warn = saveConsoleWarn;
    console.error = saveConsoleError;
  });

  it('publish tabitem props', function() {
    let testData;
    const addItem = (data) => {
      expect(data.name).to.equal(testData.name);
      expect(data.type).to.equal('submenuitem');
      expect(data.title).to.equal(testData.title);
      expect(data.component).to.equal(testData.component);
      expect(data.children).to.be.empty;
    };

    testData = testData1;
    const wrapper = shallow(<NavSubMenuItem {...testData} addItem={addItem} />);

    testData = testData2;
    wrapper.setProps({...testData});

    wrapper.unmount();
  });

  it('empty render without children', function() {
    const wrapper = shallow(<NavSubMenuItem {...testData1} />);
    expect(wrapper.isEmptyRender()).to.equal(true);
    wrapper.unmount();
  });

  it('require name prop', function() {
    expect(() => (
      <NavSubMenuItem title="title" />
    )).to.throw();
  });

  it('default title value', function() {
    const addItem = (data) => {
      expect(data.name).to.equal("itemname");
      expect(data.title).to.equal("itemname");
    };

    const wrapper = shallow(<NavSubMenuItem name="itemname" addItem={addItem} />);
    wrapper.unmount();
  });

  it('handle NavTabItem children', function() {
    const wrapper = shallow(
      <NavSubMenuItem>
        <NavTabItem name="name1" />
        <NavTabItem name="name2" />
        <NavTabItem name="name3" />
      </NavSubMenuItem>
    );

    expect(wrapper.find(NavTabItem)).to.have.length(3);

    wrapper.find(NavTabItem).forEach(node => {
      expect(node.props().addItem).to.be.a('function');
    });
    wrapper.unmount();
  });

  it('handle wrong child element type', function() {
    expect(() => (
      <NavSubMenuItem>
        <div />
      </NavSubMenuItem>
    )).to.throw();
  });

  it('handle non-unique names of child elements', function() {
    expect(() => (
      <NavSubMenuItem>
        <NavTabItem name="name1" />
        <NavTabItem name="name2" />
        <NavTabItem name="name1" />
      </NavSubMenuItem>
    )).to.throw();
  });

});
