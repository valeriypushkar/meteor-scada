import { expect } from 'chai'

import NumberType from '../common/types/number'
import DataTypes from '../common/datatypes'
import RuntimeData from '../common/runtime'
import { DataDependency } from './observer'
import './runtime'


describe('data.server.runtime', function() {
  beforeEach(function () {
    RuntimeData.collection.remove({});
  });

  it('Initialization', function() {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number);
    expect(rtd._name).to.equal('test.name');
    expect(rtd._type).to.be.an.instanceof(NumberType);
    expect(rtd._value).to.be.undefined;
    expect(rtd._depend).to.be.an.instanceof(DataDependency);
    expect(RuntimeData.impl.map.get('test.name')).to.be.equal(rtd);
  });

  it('Get default value', function() {
    const rtd = new RuntimeData.impl('test.name', DataTypes.number.default(11));
    expect(rtd._value).to.be.undefined;
    expect(rtd.get()).to.equal(11);
    expect(rtd.justGet()).to.equal(11);
    expect(rtd._value).to.be.equal(11);
  });

  it('Get value from DB', function() {
    RuntimeData.collection.insert({ name: 'test.name', value: 22 });
    const rtd = new RuntimeData.impl('test.name', DataTypes.number.default(11));
    expect(rtd._value).to.be.undefined;
    expect(rtd.get()).to.equal(22);
    expect(rtd.justGet()).to.equal(22);
    expect(rtd._value).to.be.equal(22);
  });

  it('Set value', function() {
    RuntimeData.collection.insert({ name: 'test.name', value: 22 });
    const rtd = new RuntimeData.impl('test.name', DataTypes.number);
    expect(rtd.get()).to.equal(22);

    rtd.set(33);
    const doc = RuntimeData.collection.findOne({name: 'test.name'});
    expect(doc).to.be.not.null;
    expect(doc.name).to.equal('test.name');
    expect(doc.value).to.equal(33);
  });

  it('Set value of wrong type', function() {
    RuntimeData.collection.insert({ name: 'test.name', value: 22 });
    const rtd = new RuntimeData.impl('test.name', DataTypes.number);
    expect(rtd.get()).to.equal(22);

    const saveConsoleError = console.error;

    console.error = () => {};
    rtd.set('string');
    expect(rtd.get()).to.equal(22);

    console.error = (text) => {throw new Error(text)};
    expect(() => rtd.set(true)).to.throw();

    console.error = saveConsoleError;
  });

  it('Update cache on DB changes', function(done) {
    RuntimeData.collection.insert({ name: 'test.name', value: 22, generation: 1 });
    const rtd = new RuntimeData.impl('test.name', DataTypes.number);
    expect(rtd.get()).to.equal(22);

    rtd._depend.changed = function() {
      if (rtd._value !== 44 || rtd.justGet() !== 44) {
        done(new Error('Cached value is not updated correctly'));
      } else {
        done();
      }
    }

    RuntimeData.collection.update({ name: 'test.name' },
      { $set: { value: 44, generation: 2 } }, { upsert: true });
  });
});
