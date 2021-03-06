import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import NavTabItem from './tabitem'
import NavSubMenuItem from './submenuitem'
import NavMenuItem from './menuitem'

describe('navigation.menuitem', function() {
  const saveConsoleWarn = console.warn;
  const saveConsoleError = console.error;

  const testData1 = {
    name: 'itemname',
    icon: 'itemicon',
    title: 'itemtitle',
    component: () => null,
  };

  const testData2 = {
    name: 'itemname2',
    icon: 'itemicon2',
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

  it('publish menuitem props', function() {
    let testData;
    const addItem = (data) => {
      expect(data.name).to.equal(testData.name);
      expect(data.children).to.be.empty;
      expect(data.type).to.equal('menuitem');
      expect(data.icon).to.equal(testData.icon);
      expect(data.title).to.equal(testData.title);
      expect(data.component).to.equal(testData.component);
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

  it('handle NavSubMenuItem children', function() {
    const wrapper = shallow(
      <NavMenuItem>
        <NavSubMenuItem name="name1" />
        <NavSubMenuItem name="name2" />
        <NavSubMenuItem name="name3" />
      </NavMenuItem>
    );

    expect(wrapper.find(NavSubMenuItem)).to.have.length(3);

    wrapper.find(NavSubMenuItem).forEach(node => {
      expect(node.props().addItem).to.be.a('function');
    });
    wrapper.unmount();
  });

  it('handle NavTabItem children', function() {
    const wrapper = shallow(
      <NavMenuItem>
        <NavTabItem name="name1" />
        <NavTabItem name="name2" />
        <NavTabItem name="name3" />
      </NavMenuItem>
    );

    expect(wrapper.find(NavTabItem)).to.have.length(3);

    wrapper.find(NavTabItem).forEach(node => {
      expect(node.props().addItem).to.be.a('function');
    });
    wrapper.unmount();
  });

  it('handle wrong child element type', function() {
    expect(() => (
      <NavMenuItem>
        <div />
      </NavMenuItem>
    )).to.throw();
  });

  it('handle mixed child element type', function() {
    expect(() => (
      <NavMenuItem>
        <NavSubMenuItem name="name1" />
        <NavTabItem name="name2" />
      </NavMenuItem>
    )).to.throw();
  });

  it('handle non-unique names of child elements', function() {
    expect(() => (
      <NavMenuItem>
        <NavTabItem name="name1" />
        <NavTabItem name="name2" />
        <NavTabItem name="name1" />
      </NavMenuItem>
    )).to.throw();
  });

});
