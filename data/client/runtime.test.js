import { expect } from 'chai'

import { Tracker } from 'meteor/tracker'

import NumberType from '../common/types/number'
import DataTypes from '../common/datatypes'
import RuntimeData from '../common/runtime'
import './runtime'

describe('data.client.runtime', function() {
  beforeEach(function () {
    // Use internal collection to remove all elements
    RuntimeData.collection._collection.remove({});
  });

  it('Initialization', function() {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number);
    expect(rtd._name).to.equal('test.name');
    expect(rtd._type).to.be.an.instanceof(NumberType);
  });

  it('RuntimeData.get() throws outside of tracker', function() {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number);
    expect(() => rtd.get()).to.throw();
  });

  it('RuntimeData.get() adds item to runtime list', function() {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number.default(10));

    const computation = Tracker.autorun((c) => {
      Tracker.currentComputation._runtime_list = new Set();
      expect(rtd.get()).to.equal(10);
      expect(Tracker.currentComputation._runtime_list.size).to.equal(1);
      expect(Tracker.currentComputation._runtime_list.has('test.name')).to.be.true;
    });
    computation.stop();
  });

  it('RuntimeData.get() reads data from minimongo', function() {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number);
    RuntimeData.collection._collection.insert({ name: 'test.name',
      value: 22, generation: 1 });

    const computation = Tracker.autorun((c) => {
      Tracker.currentComputation._runtime_list = new Set();
      expect(rtd.get()).to.equal(22);
    });
    computation.stop();
  });

  it('RuntimeData.get() add dependency to tracker', function(done) {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number);
    RuntimeData.collection._collection.insert({ name: 'test.name',
      value: 22, generation: 1 });

    let count = 0;
    const computation = Tracker.autorun((c) => {
      Tracker.currentComputation._runtime_list = new Set();
      count++;

      const value = rtd.get();
      if (value === 33) {
        c.stop();
        done(count === 2 ? undefined : new Error('Wrong count: ' + count));
      }
    });

    RuntimeData.collection._collection.update({ name: 'test.name' },
      { $set: { value: 33, generation: 2 } }, { upsert: true });
  });


});
