import { expect } from 'chai'
import { shallowEqual } from './equal'

describe('utils.equal', function() {
  it('shallowEqual scalar types', function() {
    expect(shallowEqual(undefined, undefined)).to.be.true;
    expect(shallowEqual(undefined, null)).to.be.false;
    expect(shallowEqual(undefined, 0)).to.be.false;
    expect(shallowEqual(undefined, false)).to.be.false;
    expect(shallowEqual(null, null)).to.be.true;
    expect(shallowEqual(null, 0)).to.be.false;
    expect(shallowEqual(null, false)).to.be.false;
    expect(shallowEqual(null, [])).to.be.false;
    expect(shallowEqual(null, {})).to.be.false;
    expect(shallowEqual(true, true)).to.be.true;
    expect(shallowEqual(false, false)).to.be.true;
    expect(shallowEqual(10, 10)).to.be.true;
    expect(shallowEqual(NaN, NaN)).to.be.true;
    expect(shallowEqual(10, -10)).to.be.false;
    expect(shallowEqual(10, '10')).to.be.false;
    expect(shallowEqual('string', 'string')).to.be.true;
    expect(shallowEqual('string', 'string1')).to.be.false;
    expect(shallowEqual('string1', 'string2')).to.be.false;

    const arr = [0];
    expect(shallowEqual(arr, arr)).to.be.true;

    const obj = {a: 0};
    expect(shallowEqual(obj, obj)).to.be.true;
  });

  it('shallowEqual arrays', function() {
    expect(shallowEqual([], [])).to.be.true;
    expect(shallowEqual([], {})).to.be.false;
    expect(shallowEqual([], '')).to.be.false;
    expect(shallowEqual([10, 20], [10, 20])).to.be.true;
    expect(shallowEqual(['10', '20'], ['10', '20'])).to.be.true;
    expect(shallowEqual(['10', '20'], ['10', 20])).to.be.false;
    expect(shallowEqual([10, 20], [10, 20, 30])).to.be.false;
    expect(shallowEqual([{}], [{}])).to.be.false;
  });

  it('shallowEqual objects', function() {
    expect(shallowEqual({}, {})).to.be.true;
    expect(shallowEqual({}, [])).to.be.false;
    expect(shallowEqual({}, '')).to.be.false;
    expect(shallowEqual({a: 10, b: 20}, {a: 10, b: 20})).to.be.true;
    expect(shallowEqual({a: '10', b: '20'}, {a: '10', b: '20'})).to.be.true;
    expect(shallowEqual({a: '10', b: '20'}, {a: '10', b: 20})).to.be.false;
    expect(shallowEqual({a: 10, b: 20}, {a: 10, b: 20, c: 30})).to.be.false;
    expect(shallowEqual({a: []}, {a: []})).to.be.false;
  });
});
