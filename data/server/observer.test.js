import { expect } from 'chai'

import DataTypes from '../common/datatypes'
import RuntimeData from '../common/runtime'
import observeData, { DataDependency, DataObserver } from './observer'
import './runtime'

describe('data.server.observer', function() {
  beforeEach(function () {
    RuntimeData.collection.remove({});
  });

  it('Create and stop observer', function(done) {
    expect(MeteorScada.observeData).to.equal(observeData);

    let executed = false;
    const observer = observeData(() => {executed = true;});
    expect(observer).to.be.an.instanceof(DataObserver);
    expect(executed).to.be.true;

    observer._onStop(() => { done(); });
    observer.stop();
  });

  it('Observer run on change', function(done) {
    let count = 0;
    const dependency = new DataDependency();

    const observer = observeData(() => {
      dependency.depend();
      if (++count > 1) done();
    });

    // Only single re-run should happen in case of multiple changed() calls
    dependency.changed();
    dependency.changed();
    dependency.changed();
    Meteor.setTimeout(() => observer.stop(), 10);
  });

  it('Observer run on RuntimeData change', function(done) {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number.default(10));
    rtd.set(20);

    let count = 0;
    const observer = observeData(() => {
      rtd.get();
      if (++count >= 3) done();
    });

    rtd.set(50);
    rtd.set(100);
    Meteor.setTimeout(() => observer.stop(), 100);
  });

  it('RuntimeData.set() inside observer method', function(done) {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number.default(10));

    let count = 0;
    const observer = observeData(() => {
      const value = rtd.get();
      count++;

      if (value === 10) {
        rtd.set(50);
      }
      if (value === 50) {
        rtd.set(100);
      }
      else if (value === 100) {
        done(count !== 3 ? new Error('Wrong count: ' + count) : undefined);
      }
    });

    Meteor.setTimeout(() => observer.stop(), 1000);
  });
});
