import { loadSoundData, getSoundBufferToPlay } from "./sound-config.js";

let context;

function initialize() {
  document.querySelector("#loadButton").addEventListener("click", () => {
    loadSounds();
  });
}

// start loading sounds
function loadSounds() {
  loadSoundData().then(() => {
    document.querySelector("#start-message").remove();
    document.querySelector("#view-container").classList.remove('hide');
    document.body.addEventListener("keydown", (keyEvent) => {
      playSound(keyEvent.key);
      makeKeyPress(keyEvent.key, true);
    });
    document.body.addEventListener("keyup", (keyEvent) => {
      makeKeyPress(keyEvent.key, false);
    });
  });
}

// play sound on key click
function playSound(key) {
  const buffer = getSoundBufferToPlay(key);
  if (buffer) {
    console.log(`Playing sound for key ${key}`);
    if (!context) {
      context = new AudioContext();
    }
    const gainNode = context.createGain();
    const source = context.createBufferSource(); // creates a sound source
    source.buffer = buffer; // tell the source which sound to play
    // source.connect(gainNode);
    source.connect(context.destination); // connect the source to the context's destination (the speakers)
    source.start(0); // play the source now
  }
}

function makeKeyPress(keyCode, isPressed) {
  if (!keyCode) {
    return;
  }
  keyCode = keyCode.toLowerCase();
  const keyDiv = document.querySelector(`#${keyCode}`);
  const labelDiv = document.querySelector(`#${keyCode}-label`)
  if (!keyDiv) {
    return;
  }
  if (isPressed) {
    keyDiv.classList.add("press");

  } else {
    keyDiv.classList.remove("press");
  }
  if (!labelDiv) {
    return;
  }
  if (isPressed) {
    labelDiv.classList.add("press-text");
  } else {
    labelDiv.classList.remove("press-text");
  }
}

// start the app
initialize();
