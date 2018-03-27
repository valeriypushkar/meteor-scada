import { expect } from 'chai'

import DataTypes from './datatypes'
import BoolType from './types/bool'
import NumberType from './types/number'
import StringType from './types/string'
import DateType from './types/date'
import ArrayType from './types/array'
import ObjectType from './types/object'

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

  it('DataTypes.date configuration', function() {
    const type = DataTypes.date;
    expect(type).to.be.an.instanceof(DateType);
    expect(type._initialize()).to.be.null;
    expect(type._validate(new Date())).to.be.true;
    expect(type._validate(new Date('1995-12-17T03:24:00'))).to.be.true;
    expect(type._validate('string')).to.be.false;
    expect(type._validate(10)).to.be.false;
    expect(type._validate({})).to.be.false;
    expect(type._validate(null)).to.be.false;
    expect(type._validate(undefined)).to.be.false;

    const typeDef = DataTypes.date.default(new Date('1995-12-17T03:24:00'));
    expect(typeDef).to.be.an.instanceof(DateType);
    const date = new Date('1995-12-17T03:24:00')
    expect(typeDef._initialize().valueOf()).to.equal(date.valueOf());
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

  it('DataTypes.object configuration', function() {
    const type = DataTypes.object;
    expect(type).to.be.an.instanceof(ObjectType);
    expect(type._initialize()).to.be.null;
    expect(type._validate({})).to.be.true;
    expect(type._validate({a: 10, b: 20, c: 30})).to.be.true;
    expect(type._validate({a: 0, b: 'string', c: true})).to.be.true;
    expect(type._validate('string')).to.be.false;
    expect(type._validate(10)).to.be.false;
    expect(type._validate([])).to.be.false;
    expect(type._validate(null)).to.be.false;
    expect(type._validate(undefined)).to.be.false;

    const typeShape = DataTypes.object.shape({
      a: DataTypes.number,
      b: DataTypes.string
    }).default({a: 100, b: 'string'});

    expect(typeShape).to.be.an.instanceof(ObjectType);
    expect(typeShape._initialize()).to.eql({a: 100, b: 'string'});
    expect(typeShape._validate({})).to.be.true;
    expect(typeShape._validate({a: 0})).to.be.true;
    expect(typeShape._validate({a: 0, b: ''})).to.be.true;
    expect(typeShape._validate({a: '', b: 0})).to.be.false;
    expect(typeShape._validate({a: 0, c: 0})).to.be.false;
    expect(typeShape._validate({c: 0, d: ''})).to.be.false;
  });

});
