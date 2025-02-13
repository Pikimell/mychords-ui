const musical_notes = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export function getNextChord(chord) {
  const firstPart = chord[0];
  const isSharp = chord.includes("#");
  const isFlat = chord.includes("b");
  console.log("next");

  let index = musical_notes.indexOf(firstPart);

  if (isSharp) {
    index++;
    chord = chord.replace("#", "");
  }
  if (isFlat) {
    index--;
    chord = chord.replace("b", "");
  }
  index++;

  return musical_notes[index % 12] + chord.slice(1);
}
export function getPrevChord(chord) {
  const firstPart = chord[0];
  const isSharp = chord.includes("#");
  const isFlat = chord.includes("b");

  let index = musical_notes.indexOf(firstPart);
  console.log("prev");

  if (isSharp) {
    index++;
    chord = chord.replace("#", "");
  }
  if (isFlat) {
    index--;
    chord = chord.replace("b", "");
  }
  index--;

  if (index < 0) index += 12;

  return musical_notes[index % 12] + chord.slice(1);
}

String.prototype.myTrim = function () {
  const res = this.replace(/.*<pre/, "<pre");
  return res;
};
