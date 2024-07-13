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
  { note: "C2", key: "Comma", file: "sounds/piano-mp3_C5.mp3", active: false },
];

const notePlaying = document.querySelector(".note-playing");

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  const keyboardKey = e.code;
  const noteDetail = getNoteDetails(keyboardKey);

  if (noteDetail == null) return;

  noteDetail.active = true;
  playNotes();

  notePlaying.innerHTML = `You pressed ${keyboardKey}, which plays the note of ${noteDetail.note}`;
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

// Add touch event listeners for mobile
document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("touchstart", (e) => {
    const note = key.getAttribute("data-note");
    const noteDetail = NOTE_DETAILS.find((n) => n.note === note);
    if (noteDetail) {
      noteDetail.active = true;
      playNotes();
      notePlaying.innerHTML = `You touched ${noteDetail.note}, which plays the note of ${noteDetail.note}`;
    }
  });

  key.addEventListener("touchend", (e) => {
    const note = key.getAttribute("data-note");
    const noteDetail = NOTE_DETAILS.find((n) => n.note === note);
    if (noteDetail) {
      noteDetail.active = false;
      playNotes();
    }
  });
});
