import { expect } from 'chai'

import DataTypes from './datatypes'
import BoolType from './types/bool'
import NumberType from './types/number'
import StringType from './types/string'
import ArrayType from './types/array'

describe('data.types', function() {

  it('DataTypes.number configuration', function() {
    const type = DataTypes.number;
    expect(type).to.be.an.instanceof(NumberType);
    expect(type._initialize()).to.be.null;
    expect(type._validate(50)).to.be.true;
    expect(type._validate(-50)).to.be.true;
    expect(type._validate(100.34)).to.be.true;
    expect(type._validate(-100.34)).to.be.true;

    const typeInt = DataTypes.number.min(10).max(500).default(20);
    expect(typeInt).to.be.an.instanceof(NumberType);
    expect(typeInt._initialize()).to.equal(20);
    expect(typeInt._validate(50)).to.be.true;
    expect(typeInt._validate(-10)).to.be.false;
    expect(typeInt._validate(1000)).to.be.false;
    expect(typeInt._validate(100.34)).to.be.true;
    expect(typeInt._validate(-100.34)).to.be.false;

    const typeFloat = DataTypes.number.min(-67.8).max(0.01).default(-5.7);
    expect(typeFloat).to.be.an.instanceof(NumberType);
    expect(typeFloat._initialize()).to.equal(-5.7);
    expect(typeFloat._validate(-50.0)).to.be.true;
    expect(typeFloat._validate(-300.67)).to.be.false;
    expect(typeFloat._validate(0.011)).to.be.false;
    expect(typeFloat._validate(0)).to.be.true;
    expect(typeFloat._validate(-68)).to.be.false;
  });

  it('DataTypes.bool configuration', function() {
    const type = DataTypes.bool;
    expect(type).to.be.an.instanceof(BoolType);
    expect(type._initialize()).to.be.null;
    expect(type._validate(true)).to.be.true;
    expect(type._validate(false)).to.be.true;
    expect(type._validate(10)).to.be.false;
    expect(type._validate({})).to.be.false;
    expect(type._validate(null)).to.be.false;
    expect(type._validate(undefined)).to.be.false;

    const typeDefTrue = DataTypes.bool.default(true);
    expect(typeDefTrue).to.be.an.instanceof(BoolType);
    expect(typeDefTrue._initialize()).to.be.true;

    const typeDefFalse = DataTypes.bool.default(false);
    expect(typeDefFalse).to.be.an.instanceof(BoolType);
    expect(typeDefFalse._initialize()).to.be.false;
  });

  it('DataTypes.string configuration', function() {
    const type = DataTypes.string;
    expect(type).to.be.an.instanceof(StringType);
    expect(type._initialize()).to.be.null;
    expect(type._validate('')).to.be.true;
    expect(type._validate('test string')).to.be.true;
    expect(type._validate(true)).to.be.false;
    expect(type._validate(10)).to.be.false;
    expect(type._validate({})).to.be.false;
    expect(type._validate(null)).to.be.false;
    expect(type._validate(undefined)).to.be.false;

    const typeDef = DataTypes.string.default('default string');
    expect(typeDef).to.be.an.instanceof(StringType);
    expect(typeDef._initialize()).to.equal('default string');
  });

  it('DataTypes.array configuration', function() {
    const type = DataTypes.array;
    expect(type).to.be.an.instanceof(ArrayType);
    expect(type._initialize()).to.be.null;
    expect(type._validate([])).to.be.true;
    expect(type._validate([10, 20, 30])).to.be.true;
    expect(type._validate([0, 'string', true])).to.be.true;
    expect(type._validate('string')).to.be.false;
    expect(type._validate(10)).to.be.false;
    expect(type._validate({})).to.be.false;
    expect(type._validate(null)).to.be.false;
    expect(type._validate(undefined)).to.be.false;

    const typeNum = DataTypes.array.of(DataTypes.number).default([100, 200]);
    expect(typeNum).to.be.an.instanceof(ArrayType);
    expect(typeNum._initialize()).to.eql([100, 200]);
    expect(typeNum._validate([])).to.be.true;
    expect(typeNum._validate([10, 20, 30])).to.be.true;
    expect(typeNum._validate([0, 'string'])).to.be.false;
  });

});
