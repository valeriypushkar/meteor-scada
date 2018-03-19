import { expect } from 'chai'

import DataTypes from './datatypes'
import NumberType from './types/number'

describe('data.types', function() {

  it('DataTypes.number return new NumberType', function() {
    const type = DataTypes.number;
    expect(type).to.be.an.instanceof(NumberType);
  });

  it('DataTypes.number configuration for integer', function() {
    const type = DataTypes.number.min(10).max(500).default(20);
    expect(type).to.be.an.instanceof(NumberType);
    expect(type.getDefault()).to.equal(20);
    expect(type.isValid(50)).to.be.true;
    expect(type.isValid(-10)).to.be.false;
    expect(type.isValid(1000)).to.be.false;
    expect(type.isValid(100.34)).to.be.true;
    expect(type.isValid(-100.34)).to.be.false;
  });

  it('DataTypes.number configuration for float', function() {
    const type = DataTypes.number.min(-67.8).max(0.01).default(-5.7);
    expect(type).to.be.an.instanceof(NumberType);
    expect(type.getDefault()).to.equal(-5.7);
    expect(type.isValid(-50.0)).to.be.true;
    expect(type.isValid(-300.67)).to.be.false;
    expect(type.isValid(0.011)).to.be.false;
    expect(type.isValid(0)).to.be.true;
    expect(type.isValid(-68)).to.be.false;
  });

});
