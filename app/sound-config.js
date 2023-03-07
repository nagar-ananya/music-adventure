// list of sound files to load
export const soundConfig = {


  // low sounds
  a: {
    soundFile: "./sounds/tedagame/f2.ogg",
    buffer: null,
  },
  b: {
    soundFile: "./sounds/tedagame/g2.ogg",
    buffer: null,
  },
  c: {
    soundFile: "./sounds/tedagame/a2.ogg",
    buffer: null,
  },
  d: {
    soundFile: "./sounds/tedagame/b2.ogg",
    buffer: null,
  },
  e: {
    soundFile: "./sounds/tedagame/c3.ogg",
    buffer: null,
  },
  f: {
    soundFile: "./sounds/tedagame/d3.ogg",
    buffer: null,
  },
  g: {
    soundFile: "./sounds/tedagame/e3.ogg",
    buffer: null,
  },
  // medium
  h: {
    soundFile: "./sounds/tedagame/a3.ogg",
    buffer: null,
  },
  i: {
    soundFile: "./sounds/tedagame/b3.ogg",
    buffer: null,
  },
  j: {
    soundFile: "./sounds/tedagame/c4.ogg",
    buffer: null,
  },
  k: {
    soundFile: "./sounds/tedagame/d4.ogg",
    buffer: null,
  },
  l: {
    soundFile: "./sounds/tedagame/e4.ogg",
    buffer: null,
  },
  m: {
    soundFile: "./sounds/tedagame/f4.ogg",
    buffer: null,
  },
  n: {
    soundFile: "./sounds/tedagame/g4.ogg",
    buffer: null,
  },
  o: {
    soundFile: "./sounds/tedagame/a4.ogg",
    buffer: null,
  },
  p: {
    soundFile: "./sounds/tedagame/b4.ogg",
    buffer: null,
  },
  q: {
    soundFile: "./sounds/tedagame/c5.ogg",
    buffer: null,
  },
  r: {
    soundFile: "./sounds/tedagame/d5.ogg",
    buffer: null,
  },
  s: {
    soundFile: "./sounds/tedagame/e5.ogg",
    buffer: null,
  },
  t: {
    soundFile: "./sounds/tedagame/f5.ogg",
    buffer: null,
  },
  u: {
    soundFile: "./sounds/tedagame/g5.ogg",
    buffer: null,
  },
  v: {
    soundFile: "./sounds/tedagame/a5.ogg",
    buffer: null,
  },
  w: {
    soundFile: "./sounds/tedagame/b5.ogg",
    buffer: null,
  },
  x: {
    soundFile: "./sounds/tedagame/c6.ogg",
    buffer: null,
  },
  y: {
    soundFile: "./sounds/tedagame/d6.ogg",
    buffer: null,
  },
  z: {
    soundFile: "./sounds/tedagame/e6.ogg",
    buffer: null,
  },

};


// function load all the sound files
export function loadSoundData() {
  const promises = [];

  Object.keys(soundConfig).forEach((key) => {
    const promise = loadKeySound(key, soundConfig);
    promises.push(promise);
  });

  return Promise.all(promises);
}

// function load a single sound and create buffer for it.
function loadKeySound(key, soundConfig) {
  var context = new AudioContext();

  return new Promise((resolve, reject) => {
    const url = soundConfig[key].soundFile;

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    // Decode asynchronously
    request.onload = function () {
      context.decodeAudioData(
        request.response,
        (buffer) => {
          soundConfig[key].buffer = buffer;
          resolve();
        },
        (error) => {
          console.log(error);
          reject("Could not load");
        }
      );
    };
    request.send();
  });
}

// function to find the sound buffer for the key and return
export function getSoundBufferToPlay(key) {
  key = key.toLowerCase();
  const keyConfig = soundConfig[key];
  if (!keyConfig) {
    console.log(`No Key Config found for ${key}`);
    return;
  }
  return keyConfig.buffer;
}
