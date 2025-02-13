import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ================== COLLECTIONS ==================

export const getCollections = async params => {
  const response = await api.get('/collections', { params });
  return response.data;
};

export const createCollection = async collection => {
  const response = await api.post('/collections', collection);
  return response.data;
};

export const updateCollection = async (playlistId, collection) => {
  const response = await api.put(`/collections/${playlistId}`, collection);
  return response.data;
};

export const removeCollection = async playlistId => {
  const response = await api.delete(`/collections/${playlistId}`);
  return response.data;
};

export const addCollectionTrack = async (playlistId, trackId) => {
  const response = await api.post(`/collections/${playlistId}/${trackId}`);
  return response.data;
};

export const removeCollectionTrack = async (playlistId, trackId) => {
  const response = await api.delete(`/collections/${playlistId}/${trackId}`);
  return response.data;
};
