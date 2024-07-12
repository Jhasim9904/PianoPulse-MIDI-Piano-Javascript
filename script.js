const NOTE_DETAILS = [
  { note: "C", key: "KeyZ", file: "sounds/piano-mp3_C4.mp3", active: false },
  { note: "Db", key: "KeyS", file: "sounds/piano-mp3_Db4.mp3", active: false },
  { note: "D", key: "KeyX", file: "sounds/piano-mp3_D4.mp3", active: false },
  { note: "Eb", key: "KeyD", file: "sounds/piano-mp3_Eb4.mp3", active: false },
  { note: "E", key: "KeyC", file: "sounds/piano-mp3_E4.mp3", active: false },
  { note: "F", key: "KeyV", file: "sounds/piano-mp3_F4.mp3", active: false },
  { note: "Gb", key: "KeyG", file: "sounds/piano-mp3_Gb4.mp3", active: false },
  { note: "G", key: "KeyB", file: "sounds/piano-mp3_G4.mp3", active: false },
  { note: "Ab", key: "KeyH", file: "sounds/piano-mp3_Ab4.mp3", active: false },
  { note: "A", key: "KeyN", file: "sounds/piano-mp3_A4.mp3", active: false },
  { note: "Bb", key: "KeyJ", file: "sounds/piano-mp3_Bb4.mp3", active: false },
  { note: "B", key: "KeyM", file: "sounds/piano-mp3_B4.mp3", active: false },
  { note: "C2", key: "Comma", file: "sounds/piano-mp3_C5.mp3", active: false }, // Changed file to 'piano-mp3_C5.mp3'
];

// select where to place key/note output under the piano
const notePlaying = document.querySelector(".note-playing");

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  const keyboardKey = e.code;
  const noteDetail = getNoteDetails(keyboardKey);

  // display what key/note combo is playing
  notePlaying.innerHTML = `You pressed the ${keyboardKey}, which plays the note of ${
    noteDetail?.note || "an unknown note"
  }`;

  if (noteDetail == null) return;

  noteDetail.active = true;
  playNotes();
});

document.addEventListener("keyup", (e) => {
  const keyboardKey = e.code;
  const noteDetail = getNoteDetails(keyboardKey);

  if (noteDetail == null) return;

  noteDetail.active = false;
  playNotes();
});

function getNoteDetails(keyboardKey) {
  return NOTE_DETAILS.find((n) => n.key === keyboardKey);
}

function playNotes() {
  NOTE_DETAILS.forEach((n) => {
    const keyElement = document.querySelector(`[data-note="${n.note}"]`);
    keyElement.classList.toggle("active", n.active);
  });

  const activeNotes = NOTE_DETAILS.filter((n) => n.active);

  activeNotes.forEach((n) => {
    playAudio(n);
  });
}

function playAudio(noteDetail) {
  const audio = new Audio(noteDetail.file);
  audio.currentTime = 0;
  audio.play();
}
