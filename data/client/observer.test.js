import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Tracker } from 'meteor/tracker'
import DataTypes from '../common/datatypes'
import RuntimeData from '../common/runtime'
import withData from './observer'

describe('data.client.observer', function() {
  let saveMeteorSubscribe;
  let subscriptionReady = false;
  let wrapper = null;

  before(function () {
    saveMeteorSubscribe = Meteor.subscribe;

    // Stub for Meteor.subscribe
    Meteor.subscribe = function () {
      return {
        ready: () => subscriptionReady
      };
    }
  });

  after(function () {
    Meteor.subscribe = saveMeteorSubscribe;
  });

  afterEach(function () {
    // Use internal collection to remove all elements
    RuntimeData.collection._collection.remove({});
    subscriptionReady = false;
    if (wrapper) { wrapper.unmount(); wrapper = null; }
  });


  function testWithoutSubscription(TestComponent, NoDataComponent) {
    const WrappedComponent = withData(() => null, TestComponent, NoDataComponent);
    wrapper = mount(<WrappedComponent parentProp='value' />);

    let props = wrapper.find(TestComponent).props();
    expect(props.dataReady).to.be.true;
    expect(props.parentProp).to.equal('value');
  }

  function testWithSubscription(TestComponent, NoDataComponent) {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number);
    const WrappedComponent = withData(() => ({data: rtd.get()}),
      TestComponent, NoDataComponent);
    wrapper = mount(<WrappedComponent parentProp='value' />);

    subscriptionReady = true;
    RuntimeData.collection._collection.update({ name: 'test.name' },
      { $set: { value: 33, generation: 2 } }, { upsert: true });
  }

  describe('#withData: render component if data not ready', function() {
    it('Render without data', function() {
      const TestComponent = () => null;
      testWithoutSubscription(TestComponent, TestComponent);
    });

    it('Render with data subscription', function(done) {
      const TestComponent = (props) => {
        props.dataReady && props.data == 33 && done();
        return null;
      };

      testWithSubscription(TestComponent, TestComponent);

      let props = wrapper.find(TestComponent).props();
      expect(props.dataReady).to.be.false;
      expect(props.parentProp).to.equal('value');
      expect(props.data).to.be.undefined;
    });
  });

  describe('#withData: render null if data not ready', function() {
    it('Render without data', function() {
      const TestComponent = () => null;
      testWithoutSubscription(TestComponent);
    });

    it('Render with data subscription', function(done) {
      const TestComponent = (props) => {
        props.dataReady && props.data == 33 && done();
        return null;
      };

      testWithSubscription(TestComponent);
      expect(wrapper.find(TestComponent)).to.have.length(0);
    });
  });

  describe('#withData: render NoDataComponent if data not ready', function() {
    it('Render without data', function() {
      const TestComponent = () => null;
      const NoDataComponent = () => null;
      testWithoutSubscription(TestComponent, NoDataComponent);
    });

    it('Render with data subscription', function(done) {
      const TestComponent = (props) => {
        props.dataReady && props.data == 33 && done();
        return null;
      };
      const NoDataComponent = () => null;

      testWithSubscription(TestComponent, NoDataComponent);
      expect(wrapper.find(TestComponent)).to.have.length(0);
      expect(wrapper.find(NoDataComponent)).to.have.length(1);
    });
  });
});
