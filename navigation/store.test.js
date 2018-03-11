import { expect } from 'chai'

import {
  publishNavigation,
  subscribeNavigation,
  unsubscribeNavigation } from './store'

describe('navigation.store', function() {
  let current = [];
  const data1 = [{ data1: 1 }];
  const data2 = [{ data2: 2 }];
  const data3 = [{ data3: 3 }];

  beforeEach(function() {
    current = [];
    publishNavigation(current);
  });

  it('update subscriber on subscribe', function() {
    publishNavigation(data1);
    const id = subscribeNavigation(data => { current = data });

    expect(current).to.equal(data1);

    unsubscribeNavigation(id);
  });

  it('update subscriber on publish', function() {
    const id = subscribeNavigation(data => { current = data });

    expect(current).to.not.equal(data1);
    publishNavigation(data1);
    expect(current).to.equal(data1);
    publishNavigation(data2);
    expect(current).to.equal(data2);
    publishNavigation(data1);
    expect(current).to.equal(data1);

    unsubscribeNavigation(id);
  });

  it('ingore unsubscribed / double unsubscribe', function() {
    const id = subscribeNavigation(data => { current = data });

    publishNavigation(data1);
    expect(current).to.equal(data1);

    unsubscribeNavigation(id);
    publishNavigation(data2);
    expect(current).to.equal(data1);

    unsubscribeNavigation(id);
  });

  it('no double callback / avoid endless loop', function() {
    publishNavigation(data1);

    const id = subscribeNavigation(function(data) {
      expect(current).to.not.equal(data);
      current = data;
    });

    publishNavigation(data2);
    publishNavigation(data2);

    unsubscribeNavigation(id);
  });

  it('multiple subscribers support', function() {
    let current1 = current;
    let current2 = current;
    let current3 = current;

    publishNavigation(data1);

    const id1 = subscribeNavigation(data => { current1 = data });
    const id2 = subscribeNavigation(data => { current2 = data });
    const id3 = subscribeNavigation(data => { current3 = data });

    expect(current1).to.equal(data1);
    expect(current2).to.equal(data1);
    expect(current3).to.equal(data1);

    publishNavigation(data2);
    expect(current1).to.equal(data2);
    expect(current2).to.equal(data2);
    expect(current3).to.equal(data2);

    unsubscribeNavigation(id2);
    publishNavigation(data3);
    expect(current1).to.equal(data3);
    expect(current2).to.equal(data2);
    expect(current3).to.equal(data3);

    unsubscribeNavigation(id1);
    unsubscribeNavigation(id3);
  });
});
