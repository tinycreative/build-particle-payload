const padStart = require('lodash.padstart');
const map = require('lodash.map');

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
  HEARTBEAT: 3,
  PARTY_MODE: 4,
  PULSING: 5,
  TWINKLE: 6,
  GAUGE: 7,
  STATUS_LIGHT: 8,
  TIMER: 9,
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

module.exports = (type, options) => {
  const payload = [];

  if (type === 'settings') {
    payload.push(TRIGGER_INDEXES[options.trigger_id] || 0);
  }

  payload.push(ANIMATION_IDS[options.animation_id] || 0);
  payload.push(options.setting || 0);
  payload.push(options.speed || 500);

  map(options.colors, (color, key) => {
    payload.push(color.r || 0);
    payload.push(color.g || 0);
    payload.push(color.b || 0);
  });

  return payload.map(v => padStart(v, 3, '0')).join('');
};
