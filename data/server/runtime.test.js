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


});
