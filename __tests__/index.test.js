const buildPayload = require('../index');

const beaconParse = input => {
  let targetAnimationIndex = parseInt(input.substring(0, 3));
  let val = input.substring(3);

  let output = {
    index: targetAnimationIndex,
    color1: {},
    color2: {},
    color3: {},
    color4: {},
  };

  let segmentSize = 3;
  let length = val.length;
  for (let i = 0; i < length / segmentSize; i++) {
    let pos = i * segmentSize;
    let current = parseInt(val.substring(pos, pos + segmentSize));

    switch (i) {
      case 0:
        output.animationId = current;
        break;
      case 1:
        output.setting = current;
        break;
      case 2:
        output.speed = current;
        break;

      case 3:
        output.color1.r = current;
        break;
      case 4:
        output.color1.g = current;
        break;
      case 5:
        output.color1.b = current;
        break;

      case 6:
        output.color2.r = current;
        break;
      case 7:
        output.color2.g = current;
        break;
      case 8:
        output.color2.b = current;
        break;

      case 9:
        output.color3.r = current;
        break;
      case 10:
        output.color3.g = current;
        break;
      case 11:
        output.color3.b = current;
        break;

      case 12:
        output.color4.r = current;
        break;
      case 13:
        output.color4.g = current;
        break;
      case 14:
        output.color4.b = current;
        break;
    }
  }

  return output;
};

test('it builds the alert payload correctly', () => {
  const input = {
    animation_id: 'CHASE',
    colors: [{ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }],
    setting: 1,
  };
  const output = buildPayload('alert', input);
  expect(beaconParse(output)).toEqual({
    animationId: 1,
    color1: input.colors[0],
    color2: input.colors[1],
    color3: {},
    color4: {},
    setting: input.setting,
    speed: 0,
    index: 0,
  });
});

test('it builds the alert payload correctly', () => {
  const input = {
    animation_id: 'HEARTBEAT',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    setting: 2,
  };
  const output = buildPayload('alert', input);
  expect(beaconParse(output)).toEqual({
    animationId: 3,
    color1: input.colors[0],
    color2: input.colors[1],
    color3: {},
    color4: {},
    setting: input.setting,
    speed: 0,
    index: 0,
  });
});

test('it builds the settings payload correctly', () => {
  const input = {
    animation_id: 'CHASE',
    trigger_id: 'DOUBLE_CLICK',
    colors: [{ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }],
    setting: 1,
  };
  const output = buildPayload('settings', input);
  expect(beaconParse(output)).toEqual({
    animationId: 1,
    color1: input.colors[0],
    color2: input.colors[1],
    color3: {},
    color4: {},
    setting: input.setting,
    speed: 0,
    index: 3,
  });
});

test('it builds the settings payload correctly', () => {
  const input = {
    animation_id: 'HEARTBEAT',
    trigger_id: 'TIMESTAMP',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    setting: 2,
  };
  const output = buildPayload('settings', input);
  expect(beaconParse(output)).toEqual({
    animationId: 3,
    color1: input.colors[0],
    color2: input.colors[1],
    color3: {},
    color4: {},
    setting: input.setting,
    speed: 0,
    index: 6,
  });
});

test('it handles different settings types', () => {
  const input = {
    animation_id: 'GAUGE',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    slider: 10,
  };
  const output = buildPayload('alert', input);
  expect(beaconParse(output)).toEqual({
    animationId: 7,
    color1: input.colors[0],
    color2: input.colors[1],
    color3: {},
    color4: {},
    setting: input.slider,
    speed: 0,
    index: 0,
  });
});

test('it handles differnt settings types', () => {
  const input = {
    animation_id: 'STATUS_LIGHT',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    setting: 2,
    slider: 10,
  };
  const output = buildPayload('alert', input);
  expect(beaconParse(output)).toEqual({
    animationId: 8,
    color1: input.colors[0],
    color2: input.colors[1],
    color3: {},
    color4: {},
    setting: input.slider,
    speed: 0,
    index: 0,
  });
});

test('it handles timer types', () => {
  const input = {
    animation_id: 'TIMER',
    colors: [{ r: 255, g: 0, b: 255 }, { r: 0, g: 255, b: 0 }],
    setting: 2,
    timespan: 10,
  };
  const output = buildPayload('alert', input);
  expect(beaconParse(output)).toEqual({
    animationId: 9,
    color1: input.colors[0],
    color2: input.colors[1],
    color3: {},
    color4: {},
    setting: input.timespan,
    speed: 0,
    index: 0,
  });
});

test('it builds the speed correctly', () => {
  const baseOutput = {
    animationId: 0,
    color1: {},
    color2: {},
    color3: {},
    color4: {},
    setting: 0,
    speed: 0,
    index: 0,
  };

  const tests = [
    {
      input: {
        animation_id: 'TIMER',
        speed_id: 'MEDIUM',
      },
      output: { ...baseOutput, animationId: 9, speed: 160 },
    },
    {
      input: {
        animation_id: 'TIMER',
        speed_id: 'SLOW',
      },
      output: { ...baseOutput, animationId: 9, speed: 90 },
    },
    {
      input: {
        animation_id: 'HEARTBEAT',
        speed_id: 'MEDIUM',
      },
      output: { ...baseOutput, animationId: 3, speed: 65 },
    },
    {
      input: {
        animation_id: 'HEARTBEAT',
        speed_id: 'SLOW',
      },
      output: { ...baseOutput, animationId: 3, speed: 83 },
    },
  ];

  tests.map(t => {
    expect(beaconParse(buildPayload('alert', t.input))).toEqual(t.output);
  });
});

test('it builds the speed correctly if there is no interpolation', () => {
  const input = {
    animation_id: 'KLJFDSKJLFDS',
    speed_id: 'MEDIUM',
  };

  const output = buildPayload('alert', input);
  expect(beaconParse(output)).toEqual({
    animationId: 0,
    color1: {},
    color2: {},
    color3: {},
    color4: {},
    setting: 0,
    speed: 500,
    index: 0,
  });
});

test('it handles a differnt speed id', () => {
  const input = {
    animation_id: 'TIMER',
    speed_id: 'BLALALS',
  };
  const output = buildPayload('alert', input);
  expect(beaconParse(output)).toEqual({
    animationId: 9,
    color1: {},
    color2: {},
    color3: {},
    color4: {},
    setting: 0,
    speed: 0,
    index: 0,
  });
});

test('it handles a missing speed id', () => {
  const input = {
    animation_id: 'TIMER',
  };
  const output = buildPayload('alert', input);
  expect(beaconParse(output)).toEqual({
    animationId: 9,
    color1: {},
    color2: {},
    color3: {},
    color4: {},
    setting: 0,
    speed: 0,
    index: 0,
  });
});

test('it builds the guage payload', () => {
  const input = {
    animation_id: 'GAUGE',
    colors: [{ r: 0, g: 255, b: 0 }, { r: 255, g: 0, b: 0 }],
    speed_id: 'MEDIUM',
    timespan: 1,
    slider: 50,
    setting: 6,
    pending: true,
  };
  const output = buildPayload('alert', input);
  expect(beaconParse(output)).toEqual({
    animationId: 7,
    color1: input.colors[0],
    color2: input.colors[1],
    color3: {},
    color4: {},
    setting: input.slider,
    speed: 500,
    index: 0,
  });
});
