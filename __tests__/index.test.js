const buildPayload = require('../index');

test('it builds the alert payload correctly', () => {
  const input = {
    animation_id: 'CHASE',
    colors: [{ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }],
    setting: 1,
  };
  const output = '001001000255000000000255000';
  expect(buildPayload('alert', input)).toEqual(output);
});

test('it builds the alert payload correctly', () => {
  const input = {
    animation_id: 'HEARTBEAT',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    setting: 2,
  };
  const output = '003002000255000255000255000';
  expect(buildPayload('alert', input)).toEqual(output);
});

test('it builds the settings payload correctly', () => {
  const input = {
    animation_id: 'CHASE',
    trigger_id: 'DOUBLE_CLICK',
    colors: [{ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }],
    setting: 1,
  };
  const output = '003001001000255000000000255000';
  expect(buildPayload('settings', input)).toEqual(output);
});

test('it builds the settings payload correctly', () => {
  const input = {
    animation_id: 'HEARTBEAT',
    trigger_id: 'TIMESTAMP',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    setting: 2,
  };
  const output = '006003002000255000255000255000';
  expect(buildPayload('settings', input)).toEqual(output);
});

test('it handles differnt settings types', () => {
  const input = {
    animation_id: 'GAUGE',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    setting: 2,
    slider: 10,
  };
  const output = '007010000255000255000255000';
  expect(buildPayload('alert', input)).toEqual(output);
});

test('it handles differnt settings types', () => {
  const input = {
    animation_id: 'STATUS_LIGHT',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    setting: 2,
    slider: 10,
  };
  const output = '008010000255000255000255000';
  expect(buildPayload('alert', input)).toEqual(output);
});

test('it handles timer types', () => {
  const input = {
    animation_id: 'TIMER',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    setting: 2,
    timespan: 10,
  };
  const output = '009010000255000255000255000';
  expect(buildPayload('alert', input)).toEqual(output);
});
