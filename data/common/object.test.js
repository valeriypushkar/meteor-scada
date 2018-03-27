import { Meteor } from 'meteor/meteor'
import { expect } from 'chai'

import DataTypes from './datatypes'
import RuntimeData from './runtime'
import ObjectData from './object'


describe('data.object', function() {
  var saveRuntimeDataImpl;

  before(function() {
    saveRuntimeDataImpl = RuntimeData.impl;

    // Create mock for RuntimeData class
    class RuntimeDataMock extends RuntimeData {
      constructor(name, type) {
        super(name, type);
        this._value = null;
      }

      get() {
        return this._value;
      }

      set(value) {
        this._value = value;
      }
    }

    RuntimeData.impl = RuntimeDataMock;
  });

  after(function() {
    RuntimeData.impl = saveRuntimeDataImpl;
  });

  it('Generate name of child data entities', function() {
    const obj = new ObjectData('root', {
      child1: DataTypes.number,
      child2: {},
      child3: {child4: DataTypes.number}
    });

    expect(obj.child1.name).to.equal('root.child1');
    expect(obj.child2.name).to.equal('root.child2');
    expect(obj.child3.name).to.equal('root.child3');
    expect(obj.child3.child4.name).to.equal('root.child3.child4');
  });

  it('Empty ObjectData name', function() {
    const obj = new ObjectData('', {
      child1: DataTypes.number,
      child2: DataTypes.number,
    });

    expect(obj.child1.name).to.equal('child1');
    expect(obj.child2.name).to.equal('child2');
  });

  it('Create RuntimeData entities', function() {
    const obj = new ObjectData('root', {
      childBool: DataTypes.bool,
      childNumber: DataTypes.number,
      childString: DataTypes.string,
      childObject: DataTypes.object,
      childArray: DataTypes.array,
    });

    expect(obj.childBool).to.be.an.instanceof(RuntimeData);
    expect(obj.childNumber).to.be.an.instanceof(RuntimeData);
    expect(obj.childString).to.be.an.instanceof(RuntimeData);
    expect(obj.childObject).to.be.an.instanceof(RuntimeData);
    expect(obj.childArray).to.be.an.instanceof(RuntimeData);
  });

  it('Embedded ObjectData', function() {
    const obj = new ObjectData('root', {
      object1: {
        child1: DataTypes.number,
        object12: {
          child2: DataTypes.number
        }
      },
      object2: {
        child3: DataTypes.number
      }
    });

    expect(obj.object1).to.be.an.instanceof(ObjectData);
    expect(obj.object1.child1).to.be.an.instanceof(RuntimeData);
    expect(obj.object1.object12).to.be.an.instanceof(ObjectData);
    expect(obj.object1.object12.child2).to.be.an.instanceof(RuntimeData);
    expect(obj.object2).to.be.an.instanceof(ObjectData);
    expect(obj.object2.child3).to.be.an.instanceof(RuntimeData);
  });

  it('Ignore not valid properties', function() {
    const obj = new ObjectData('', {
      child1: DataTypes.number,
      child2: 10,
      child3: 'some string',
      child4: [0, 1, 2]
    });

    expect(obj.child1).to.exist;
    expect(obj.child2).to.be.undefined;
    expect(obj.child3).to.be.undefined;
    expect(obj.child4).to.be.undefined;
  });

  it('Get object values', function() {
    const obj = new ObjectData('root', {
      value1: DataTypes.number,
      value2: DataTypes.number,
      object1: {
        child1: DataTypes.number,
        object2: {
          child2: DataTypes.number
        }
      }
    });

    obj.value1.set(10);
    obj.value2.set(100);
    obj.object1.child1.set(500);
    obj.object1.object2.child2.set(1000);

    expect(obj.get()).to.eql({
      value1: 10,
      value2: 100,
      object1: {
        child1: 500,
        object2: {
          child2: 1000
        }
      }
    });
  });

  it('Set object values', function() {
    const obj = new ObjectData('root', {
      value1: DataTypes.number,
      value2: DataTypes.number,
      object1: {
        child1: DataTypes.number,
        object2: {
          child2: DataTypes.number
        }
      }
    });

    obj.set({
      value1: 10,
      value2: 100,
      object1: {
        child1: 500,
        object2: {
          child2: 1000
        }
      }
    });

    expect(obj.value1.get()).to.equal(10);
    expect(obj.value2.get()).to.equal(100);
    expect(obj.object1.child1.get()).to.equal(500);
    expect(obj.object1.object2.child2.get()).to.equal(1000);
  });

});
