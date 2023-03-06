import { loadSoundData, getSoundBufferToPlay } from "./sound-config.js";

function initialize() {
  document.querySelector("#loadButton").addEventListener("click", () => {
    loadSounds();
  });
}

// start loading sounds
function loadSounds() {
  loadSoundData().then(() => {
    document.querySelector("#start-message").remove();
    document.body.addEventListener("keydown", (keyEvent) => {
      playSound(keyEvent.key); 
    });
  });

}


// play sound on key click
function playSound(key) {
  const buffer = getSoundBufferToPlay(key);
  if (buffer) {
    const context = new AudioContext();
    const gainNode = context.createGain();
    const source = context.createBufferSource(); // creates a sound source
    source.buffer = buffer; // tell the source which sound to play
    source.connect(gainNode);
    gainNode.connect(context.destination);; // connect the source to the context's destination (the speakers)
    source.start(); // play the source now
  }
}

// start the app
initialize();
