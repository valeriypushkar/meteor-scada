import { Meteor } from 'meteor/meteor'

function square(t, min, max, data) {
  return (x) => data.set(x % t < t / 2 ? min : max);
}

function sine(t, min, max, data) {
  const amp = (max - min) / 2;
  const offset = min + amp;
  return (x) => data.set(amp * Math.sin(2 * Math.PI * x / t) + offset);
}

function triangle(t, min, max, data) {
  const amp = max - min;
  const tt = t / 2;

  return (x) => {
    x = x % t;
    data.set(x < tt ? min + amp * x / tt : min + amp * (t - x) / tt);
  }
}

function sawtooth(t, min, max, data) {
  return (x) => data.set((max - min) * (x % t) / t + min);
}

export class WaveGenerator {
  constructor(sample) {
    this._t = 0;
    this._st = sample / 1000;
    this._waves = [];
    this._interval = Meteor.setInterval(this._fire.bind(this), sample);
  }

  bind(wave, t, min, max, data) {
    if (wave === 'square') this._waves.push(square(t, min, max, data));
    else if (wave === 'sine') this._waves.push(sine(t, min, max, data));
    else if (wave === 'triangle') this._waves.push(triangle(t, min, max, data));
    else if (wave === 'sawtooth') this._waves.push(sawtooth(t, min, max, data));
  }

  stop() {
    Meteor.clearInterval(this._interval);
    this._waves = [];
  }

  _fire() {
    this._t += this._st;
    this._waves.forEach((wave) => wave(this._t));
  }
}
