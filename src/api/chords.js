import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ================== CHORDS ==================

export const getChords = async params => {
  // const urlParams = new URLSearchParams(params);
  // const json = localStorage.getItem(urlParams) || 'null';
  // const data = JSON.parse(json);

  // if (data) {
  //   return data;
  // }
  const response = await api.get('/chords', {
    params,
  });
  // const copy = { ...response.data, expires: Date.now() };
  // localStorage.setItem(urlParams, JSON.stringify(copy));
  return response.data;
};

export const getChord = async chordId => {
  const data = getFromLS(chordId);
  if (data) return data;

  const response = await api.get(`/chords/${chordId}`);
  saveToLS(response.data);
  return response.data;
};

export const createChord = async chord => {
  const response = await api.post('/chords', chord);
  saveToLS(response.data);
  return response.data;
};

export const updateChord = async (chordId, chord) => {
  const response = await api.put(`/chords/${chordId}`, chord);
  saveToLS(response.data);
  return response.data;
};

export const removeChord = async chordId => {
  const response = await api.delete(`/chords/${chordId}`);
  removeFromLS(chordId);
  return response.data;
};

function removeFromLS(chordID) {
  const items = JSON.parse(localStorage.getItem('items') || '{}');
  delete items[chordID];
  localStorage.setItem('items', JSON.stringify(items));
}

function saveToLS(chords) {
  const items = JSON.parse(localStorage.getItem('items') || '{}');
  const id = chords._id;
  const copy = { ...chords, expires: Date.now() };
  items[id] = copy;
  localStorage.setItem('items', JSON.stringify(items));
}

function getFromLS(chordId) {
  try {
    const json = localStorage.getItem('items') || '{}';
    const data = JSON.parse(json);
    const { expires, ...chords } = data[chordId];
    const diff = Date.now() - expires;
    if (diff > 7 * 24 * 60 * 60 * 1000) {
      throw new Error('Data Expires');
    }
    return chords;
  } catch {
    return null;
  }
}
