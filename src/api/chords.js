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
  const response = await api.get('/chords', {
    params,
  });
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
  localStorage.removeItem(chordId);
  return response.data;
};

function saveToLS(chords) {
  const id = chords._id;
  const copy = { ...chords, expires: Date.now() };
  localStorage.setItem(id, JSON.stringify(copy));
}

function getFromLS(chordId) {
  try {
    const json = localStorage.getItem(chordId);
    const data = JSON.parse(json);
    const { expires, ...chords } = data;
    const diff = Date.now() - expires;
    if (diff > 7 * 24 * 60 * 60 * 1000) {
      throw new Error('Data Expires');
    }
    return chords;
  } catch {
    return null;
  }
}
