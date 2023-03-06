// list of sound files to load
export const soundConfig = {
  p: {
    soundFile: "./sounds/tedagame/448532__tedagame__c5.ogg",
    buffer: null,
  },
  q: {
    soundFile: "./sounds/tedagame/448533__tedagame__c6.ogg",
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
