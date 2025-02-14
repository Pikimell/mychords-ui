const musical_notes = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

export const updateHtmlChords = (html, tune) => {
  const callback = tune > 0 ? getNextChord : getPrevChord;
  const dom = document.createElement('div');
  dom.innerHTML = html;
  const arr1 = dom.querySelectorAll('.b-accord__symbol');
  const arr2 = dom.querySelectorAll('span');
  const arr = arr1.length ? arr1 : arr2;

  for (let i = 0; i < Math.abs(tune); i++) {
    arr.forEach(el => {
      const element = el.children[0] || el;
      const chord = el.textContent.trim();
      element.textContent = callback(chord);
    });
  }

  return dom.innerHTML;
};

export function getNextChord(chord) {
  const firstPart = chord[0];
  const isSharp = chord.includes('#');
  const isFlat = chord.includes('b');

  let index = musical_notes.indexOf(firstPart);
  if (index === -1) {
    console.log('ERR');

    return chord;
  }

  if (isSharp) {
    index++;
    chord = chord.replace('#', '');
  }
  if (isFlat) {
    index--;
    chord = chord.replace('b', '');
  }
  index++;

  return musical_notes[index % 12] + chord.slice(1);
}

export function getPrevChord(chord) {
  const firstPart = chord[0];
  const isSharp = chord.includes('#');
  const isFlat = chord.includes('b');

  let index = musical_notes.indexOf(firstPart);

  if (isSharp) {
    index++;
    chord = chord.replace('#', '');
  }
  if (isFlat) {
    index--;
    chord = chord.replace('b', '');
  }
  index--;

  if (index < 0) index += 12;

  return musical_notes[index % 12] + chord.slice(1);
}

String.prototype.myTrim = function () {
  const res = this.replace(/.*<pre/, '<pre');
  return res;
};
