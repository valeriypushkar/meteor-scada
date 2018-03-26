import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Tracker } from 'meteor/tracker'
import DataTypes from '../common/datatypes'
import RuntimeData from '../common/runtime'
import { withData, withDataOnly, withDataLoader } from './observer'
import LoadingPage from '../../utils/client/loading'

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


  function testWithoutSubscription(withMethod) {
    const TestComponent = () => null;
    const WrappedComponent = withMethod(() => null, TestComponent);
    wrapper = mount(<WrappedComponent parentProp='value' />);

    let props = wrapper.find(TestComponent).props();
    expect(props.dataReady).to.be.true;
    expect(props.parentProp).to.equal('value');
  }

  function testWithSubscription(withMethod, TestComponent) {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number);
    const WrappedComponent = withMethod(() => ({data: rtd.get()}), TestComponent);
    wrapper = mount(<WrappedComponent parentProp='value' />);

    subscriptionReady = true;
    RuntimeData.collection._collection.update({ name: 'test.name' },
      { $set: { value: 33, generation: 2 } }, { upsert: true });
  }

  describe('#withData', function() {
    it('Render without data', function() {
      testWithoutSubscription(withData);
    });

    it('Render with data subscription', function(done) {
      const TestComponent = (props) => {
        props.dataReady && props.data == 33 && done();
        return null;
      };

      testWithSubscription(withData, TestComponent);

      let props = wrapper.find(TestComponent).props();
      expect(props.dataReady).to.be.false;
      expect(props.parentProp).to.equal('value');
      expect(props.data).to.be.undefined;
    });
  });

  describe('#withDataOnly', function() {
    it('Render without data', function() {
      testWithoutSubscription(withDataOnly);
    });

    it('Render with data subscription', function(done) {
      const TestComponent = (props) => {
        props.dataReady && props.data == 33 && done();
        return null;
      };

      testWithSubscription(withDataOnly, TestComponent);
      expect(wrapper.find(TestComponent)).to.have.length(0);
    });
  });

  describe('#withDataLoader', function() {
    it('Render without data', function() {
      testWithoutSubscription(withDataLoader);
    });

    it('Render with data subscription', function(done) {
      const TestComponent = (props) => {
        props.dataReady && props.data == 33 && done();
        return null;
      };

      testWithSubscription(withDataLoader, TestComponent);
      expect(wrapper.find(TestComponent)).to.have.length(0);
      expect(wrapper.find(LoadingPage)).to.have.length(1);
    });
  });
});
