import { expect } from 'chai'

import DataTypes from './datatypes'
import BoolType from './types/bool'
import NumberType from './types/number'
import StringType from './types/string'

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

  it('DataTypes.bool configuration', function() {
    const type = DataTypes.bool;
    expect(type).to.be.an.instanceof(BoolType);
    expect(type.getDefault()).to.be.false;
    expect(type.isValid(true)).to.be.true;
    expect(type.isValid(false)).to.be.true;
    expect(type.isValid(10)).to.be.false;
    expect(type.isValid({})).to.be.false;
    expect(type.isValid(null)).to.be.false;
    expect(type.isValid(undefined)).to.be.false;

    const typeDefTrue = DataTypes.bool.default(true);
    expect(typeDefTrue).to.be.an.instanceof(BoolType);
    expect(typeDefTrue.getDefault()).to.be.true;

    const typeDefFalse = DataTypes.bool.default(false);
    expect(typeDefFalse).to.be.an.instanceof(BoolType);
    expect(typeDefFalse.getDefault()).to.be.false;
  });

  it('DataTypes.string configuration', function() {
    const type = DataTypes.string;
    expect(type).to.be.an.instanceof(StringType);
    expect(type.getDefault()).to.equal('');
    expect(type.isValid('')).to.be.true;
    expect(type.isValid('test string')).to.be.true;
    expect(type.isValid(true)).to.be.false;
    expect(type.isValid(10)).to.be.false;
    expect(type.isValid({})).to.be.false;
    expect(type.isValid(null)).to.be.false;
    expect(type.isValid(undefined)).to.be.false;

    const typeDef = DataTypes.string.default('default string');
    expect(typeDef).to.be.an.instanceof(StringType);
    expect(typeDef.getDefault()).to.equal('default string');
  });

});
