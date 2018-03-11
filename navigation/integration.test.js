import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'


import withNavigation from './consumer'
import NavigationProvider from './provider'
import NavMenuItem from './menuitem'


describe('navigation.integration', function() {
  const NullComponent = () => null;
  const ConsumerComponent = () => null;
  const WrappedConsumerComponent = withNavigation(ConsumerComponent);
  const TestFragment = (props) => (
    <React.Fragment>
      <NavigationProvider>
        {props.item1 && props.item1}
        {props.item2 && props.item2}
      </NavigationProvider>
      <WrappedConsumerComponent />
    </React.Fragment>
  );

  const dataSet1 = {
    children: [],
    name: 'item1',
    type: 'NavMenuItem',
    childType: null,
    icon: 'item',
    title: 'Item 1',
    component: NullComponent,
    componentProps: {value: 1}
  };

  const item1 = (
    <NavMenuItem name='item1' icon='item' title='Item 1'
      component={NullComponent} componentProps={{value: 1}} />
  );

  const dataSet2 = {
    children: [],
    name: 'item2',
    type: 'NavMenuItem',
    childType: null,
    icon: 'item',
    title: 'Item 2',
    component: NullComponent,
    componentProps: {newvalue: 2}
  };

  const item2 = (
    <NavMenuItem name='item2' icon='item' title='Item 2'
      component={NullComponent} componentProps={{newvalue: 2}} />
  );

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
