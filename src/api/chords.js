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
  const response = await api.get(`/chords/${chordId}`);
  return response.data;
};

export const createChord = async chord => {
  const response = await api.post('/chords', chord);
  return response.data;
};

export const updateChord = async (chordId, chord) => {
  const response = await api.put(`/chords/${chordId}`, chord);
  return response.data;
};

export const removeChord = async chordId => {
  const response = await api.delete(`/chords/${chordId}`);
  return response.data;
};
