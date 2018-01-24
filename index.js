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

module.exports = options => {
  const payload = [
    ANIMATION_IDS[options.animation_id] || 0,
    options.setting || 0,
    options.speed || 500,
  ];

  map(options.colors, (color, key) => {
    payload.push(color.r || 0);
    payload.push(color.g || 0);
    payload.push(color.b || 0);
  });

  return payload.map(v => padStart(v, 3, '0')).join('');
};
