const buildPayload = require('../index');

test('it builds the payload correctly', () => {
  const input = {
    animation_id: 'CHASE',
    colors: [{ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }],
    setting: 1,
  };
  const output = '001001500255000000000255000';
  expect(buildPayload(input)).toEqual(output);
});

test('it builds the payload correctly', () => {
  const input = {
    animation_id: 'HEARTBEAT',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    setting: 2,
  };
  const output = '003002500255000255000255000';
  expect(buildPayload(input)).toEqual(output);
});
