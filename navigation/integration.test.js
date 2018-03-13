import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import withNavigation from './consumer'
import NavigationProvider from './provider'
import NavMenuItem from './menuitem'
import NavSubMenuItem from './submenuitem'
import NavTabItem from './tabitem'

describe('navigation.integration', function() {
  const TestC1 = () => null;
  const TestC2 = () => null;
  const ConsumerComponent = () => null;
  const WrappedConsumerComponent = withNavigation(ConsumerComponent);

  const TestFragment = (props) => (
    <React.Fragment>
      <NavigationProvider>
        {props.item1 && props.item1}
        {props.item2 && props.item2}
        {props.item3 && props.item3}
      </NavigationProvider>
      <WrappedConsumerComponent />
    </React.Fragment>
  );

  const dataSet1 = {
    children: [],
    name: 'item1',
    type: 'menuitem',
    icon: 'item',
    title: 'Item 1',
    component: TestC1
  };

  const item1 = (
    <NavMenuItem name='item1' icon='item' title='Item 1' component={TestC1} />
  );

  const dataSet2 = {
    name: 'item2',
    type: 'menuitem',
    icon: 'item',
    title: 'Item 2',
    component: undefined,
    children: [
      {
        name: 'tabitem1',
        type: 'tabitem',
        title: 'TabTitle1',
        component: TestC1
      },
      {
        name: 'tabitem2',
        type: 'tabitem',
        title: 'TabTitle2',
        component: TestC2
      }
    ]
  };

  const item2 = (
    <NavMenuItem name='item2' icon='item' title='Item 2'>
      <NavTabItem name='tabitem1' title='TabTitle1' component={TestC1}/>
      <NavTabItem name='tabitem2' title='TabTitle2' component={TestC2}/>
    </NavMenuItem>
  );

  const dataSet3 = {
    name: 'item3',
    type: 'menuitem',
    icon: 'item',
    title: 'Item 3',
    component: undefined,
    children: [
      {
        name: 'submenuitem1',
        type: 'submenuitem',
        title: 'SubTitle',
        component: TestC1,
        children: []
      },
      {
        name: 'submenuitem2',
        type: 'submenuitem',
        title: 'SubTitle',
        component: undefined,
        children: [
          {
            name: 'tabitem1',
            type: 'tabitem',
            title: 'TabTitle1',
            component: TestC1,
          },
          {
            name: 'tabitem2',
            type: 'tabitem',
            title: 'TabTitle2',
            component: TestC2,
          }
        ]
      }
    ]
  };

  const item3 = (
    <NavMenuItem name='item3' icon='item' title='Item 3'>
      <NavSubMenuItem name='submenuitem1' title='SubTitle' component={TestC1}/>
      <NavSubMenuItem name='submenuitem2' title='SubTitle'>
        <NavTabItem name='tabitem1' title='TabTitle1' component={TestC1}/>
        <NavTabItem name='tabitem2' title='TabTitle2' component={TestC2}/>
      </NavSubMenuItem>
    </NavMenuItem>
  );

  it('handle terminate menu items', function() {
    const wrapper = mount(<TestFragment item1={item1} />);
    let nav = wrapper.find(ConsumerComponent).props().navigation;
    expect(nav).to.eql([dataSet1]);
  });

  it('handle menu items with tabs', function() {
    const wrapper = mount(<TestFragment item1={item1} item2={item2}/>);
    let nav = wrapper.find(ConsumerComponent).props().navigation;

    expect(nav).to.eql([dataSet1, dataSet2]);
  });

  it('handle submenu items with tabs', function() {
    const wrapper = mount(<TestFragment item1={item1} item2={item3}/>);
    let nav = wrapper.find(ConsumerComponent).props().navigation;
    expect(nav).to.eql([dataSet1, dataSet3]);
  });

  it('handle mixed configuration', function() {
    const wrapper = mount(
      <TestFragment item1={item1} item2={item2} item3={item3}/>
    );
    let nav = wrapper.find(ConsumerComponent).props().navigation;
    expect(nav).to.eql([dataSet1, dataSet2, dataSet3]);
  });

  it('consumes navigation changes', function() {
    const wrapper = mount(<TestFragment item1={item1} />);
    let nav = wrapper.find(ConsumerComponent).props().navigation;
    expect(nav).to.eql([dataSet1]);

    wrapper.setProps({ item1: item1, item2: item2 });
    wrapper.update();
    nav = wrapper.find(ConsumerComponent).props().navigation;
    expect(nav).to.eql([dataSet1, dataSet2]);

    wrapper.unmount();
  });

});
