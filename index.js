const padStart = require('lodash.padstart');
const map = require('lodash.map');
const everpolate = require('everpolate');

// 0: animationSolid
// 1: animationChase
// 2: animationRainbowSpin
// 3: animationHeartbeat
// 4: animationRandomParty
// 5: animationPulse
// 6: animationTwinkle
// 7: animationGauge
// 8: animationGaugeColors
// 9: animationTimerColors

const ANIMATION_IDS = {
  SOLID: 0,
  CHASE: 1,
  RAINBOW_SPIN: 2,
  HEARTBEAT: 3,
  PARTY_MODE: 4,
  PULSING: 5,
  TWINKLE: 6,
  GAUGE: 7,
  STATUS_LIGHT: 8,
  TIMER: 9,
};

const SETTINGS_KEY = {
  SOLID: 'setting',
  CHASE: 'setting',
  RAINBOW_SPIN: 'setting',
  HEARTBEAT: 'setting',
  PARTY_MODE: 'setting',
  PULSING: 'setting',
  TWINKLE: 'setting',
  GAUGE: 'slider',
  STATUS_LIGHT: 'slider',
  TIMER: 'timespan',
};

const ALERT_INDEX = 0;
const IDLE_INDEX = 1;
const LISTENING_INDEX = 2;
const DOUBLE_CLICK_INDEX = 3;
const TRIPPLE_CLICK_INDEX = 4;
const LONG_CLICK_INDEX = 5;
const TIMESTAMP_INDEX = 6;

const TRIGGER_INDEXES = {
  ALERT: ALERT_INDEX,
  IDLE: IDLE_INDEX,
  LISTENING: LISTENING_INDEX,
  DOUBLE_CLICK: DOUBLE_CLICK_INDEX,
  TRIPPLE_CLICK: TRIPPLE_CLICK_INDEX,
  LONG_CLICK: LONG_CLICK_INDEX,
  TIMESTAMP: TIMESTAMP_INDEX,
};

const SPEEDS = {
  VERY_SLOW: 100,
  SLOW: 300,
  MEDIUM: 500,
  FAST: 700,
  VERY_FAST: 900,
};

const SPEED_INTERPOLATIONS = {
  CHASE: [150, 30],
  RAINBOW_SPIN: [30, 2],
  HEARTBEAT: [100, 30],
  PARTY_MODE: [500, 50],
  PULSING: [20, 300],
  TWINKLE: [1, 10],
  TIMER: [20, 300],
};

const interpolateSpeed = (animationId, speedId) => {
  const interpolation = SPEED_INTERPOLATIONS[animationId];
  const speed = SPEEDS[speedId] || 0;

  if (interpolation && speed > 0) {
    const outputSpeed = everpolate.linear(speed, [100, 900], interpolation)[0];
    return Math.round(outputSpeed);
  }

  return speed;
};

module.exports = (type, options) => {
  const payload = [];

  if (type === 'settings') {
    payload.push(TRIGGER_INDEXES[options.trigger_id] || 0);
  }

  payload.push(ANIMATION_IDS[options.animation_id] || 0);

  // get the settings value
  const key = SETTINGS_KEY[options.animation_id];
  payload.push(options[key] || 0);

  // interpolate the speed
  const speed = interpolateSpeed(options.animation_id, options.speed_id);
  payload.push(speed || 0);

  map(options.colors, (color, key) => {
    payload.push(color.r || 0);
    payload.push(color.g || 0);
    payload.push(color.b || 0);
  });

  return payload.map(v => padStart(v, 3, '0')).join('');
};
